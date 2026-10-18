import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from './src/server/storage';
import {
  analyzeIssueWithAI,
  compareResolutionWithAI,
  transcribeAudioWithAI,
  getAIStatus
} from './src/server/aiService';
import { WorkspaceId, Priority, TaskStatus } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // In-memory active session user state (can be switched freely via UI)
  let activeUserId = 'usr-1'; // Default: Elena Rostova (Operations Director)

  // -------------------------------------------------------------
  // API Routes
  // -------------------------------------------------------------

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'OpsPilot AI Server'
    });
  });

  // AI status
  app.get('/api/ai/status', (req: Request, res: Response) => {
    const status = getAIStatus();
    res.json(status);
  });

  // Workspaces
  app.get('/api/workspaces', (req: Request, res: Response) => {
    const workspaces = storage.getWorkspaces();
    res.json(workspaces);
  });

  app.get('/api/workspaces/:id', (req: Request, res: Response) => {
    const workspace = storage.getWorkspace(req.params.id as WorkspaceId);
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    res.json(workspace);
  });

  // Users & Auth
  app.get('/api/users', (req: Request, res: Response) => {
    const workspaceId = req.query.workspaceId as WorkspaceId | undefined;
    const users = storage.getUsers(workspaceId);
    res.json(users);
  });

  app.get('/api/auth/current', (req: Request, res: Response) => {
    const user = storage.getUserById(activeUserId) || storage.getUsers()[0];
    res.json(user);
  });

  app.post('/api/auth/switch-user', (req: Request, res: Response) => {
    const { userId } = req.body;
    const targetUser = storage.getUserById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    activeUserId = userId;
    res.json(targetUser);
  });

  // Dashboard Stats
  app.get('/api/dashboard/stats', (req: Request, res: Response) => {
    const workspaceId = (req.query.workspaceId as WorkspaceId) || 'ranchers';
    const stats = storage.getDashboardStats(workspaceId);
    res.json(stats);
  });

  // Tasks
  app.get('/api/tasks', (req: Request, res: Response) => {
    const { workspaceId, status, category, priority, assignedTeam, search } = req.query;

    const tasks = storage.getTasks({
      workspaceId: workspaceId as WorkspaceId | undefined,
      status: status as TaskStatus | undefined,
      category: category as string | undefined,
      priority: priority as Priority | undefined,
      assignedTeam: assignedTeam as string | undefined,
      search: search as string | undefined
    });

    res.json(tasks);
  });

  app.get('/api/tasks/:id', (req: Request, res: Response) => {
    const task = storage.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  });

  app.post('/api/tasks', (req: Request, res: Response) => {
    try {
      const {
        title,
        description,
        workspaceId,
        location,
        category,
        priority,
        status = 'assigned',
        reportingMethod = 'photo',
        originalEvidenceUrl,
        voiceTranscription,
        voiceAudioUrl,
        aiAnalysis,
        assignedTeam,
        assigneeId,
        dueHours = 24
      } = req.body;

      if (!title || !description || !workspaceId) {
        return res.status(400).json({ error: 'Missing required task fields (title, description, workspaceId)' });
      }

      const reporter = storage.getUserById(activeUserId) || storage.getUsers()[0];
      const assignee = assigneeId ? storage.getUserById(assigneeId) : undefined;
      const dueAt = new Date(Date.now() + dueHours * 60 * 60 * 1000).toISOString();

      const newTask = storage.createTask({
        title,
        description,
        workspaceId,
        location: location || 'General Area',
        category: category || 'General Operations',
        priority: priority || 'medium',
        status: status || 'assigned',
        reportingMethod,
        originalEvidenceUrl,
        voiceTranscription,
        voiceAudioUrl,
        aiAnalysis,
        assignedTeam: assignedTeam || 'Operations',
        assignee,
        reporter,
        dueAt
      });

      res.status(201).json(newTask);
    } catch (err: any) {
      console.error('[Server] Error creating task:', err);
      res.status(500).json({ error: err.message || 'Internal server error creating task' });
    }
  });

  app.patch('/api/tasks/:id', (req: Request, res: Response) => {
    const { status, priority, assigneeId, assignedTeam, dueAt } = req.body;
    const actor = storage.getUserById(activeUserId)?.name || 'Operations Lead';

    const updates: any = {};
    if (status) updates.status = status;
    if (priority) updates.priority = priority;
    if (assignedTeam) updates.assignedTeam = assignedTeam;
    if (dueAt) updates.dueAt = dueAt;
    if (assigneeId !== undefined) {
      updates.assignee = assigneeId ? storage.getUserById(assigneeId) : null;
    }

    const updatedTask = storage.updateTask(req.params.id, updates, actor);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  });

  app.post('/api/tasks/:id/comments', (req: Request, res: Response) => {
    const { content, isInternal } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Comment content cannot be empty' });
    }

    const author = storage.getUserById(activeUserId) || storage.getUsers()[0];
    const task = storage.addComment(req.params.id, author, content.trim(), Boolean(isInternal));
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  });

  // Submit Resolution Evidence (Technician)
  app.post('/api/tasks/:id/resolve', async (req: Request, res: Response) => {
    try {
      const { completionNotes, partsUsed, resolutionEvidenceUrl } = req.body;
      const task = storage.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const activeUser = storage.getUserById(activeUserId) || storage.getUsers()[0];

      // Perform AI Before-and-After Verification Comparison
      let aiComparison;
      try {
        aiComparison = await compareResolutionWithAI({
          originalDescription: task.description,
          originalEvidenceUrl: task.originalEvidenceUrl,
          completionNotes: completionNotes || 'Work completed per protocol.',
          partsUsed: partsUsed || 'None recorded.',
          resolutionImageBase64: resolutionEvidenceUrl,
          resolutionMimeType: resolutionEvidenceUrl?.startsWith('data:image/png')
            ? 'image/png'
            : 'image/jpeg',
          workspaceId: task.workspaceId
        });
      } catch (aiErr) {
        console.warn('[Server] AI resolution comparison error, using fallback:', aiErr);
      }

      const resolutionSubmission = {
        submittedBy: activeUser,
        submittedAt: new Date().toISOString(),
        completionNotes: completionNotes || 'Remediation completed.',
        partsUsed,
        resolutionEvidenceUrl: resolutionEvidenceUrl || task.originalEvidenceUrl || '',
        aiComparison
      };

      const updatedTask = storage.updateTask(
        task.id,
        {
          status: 'awaiting_verification',
          resolutionSubmission
        },
        activeUser.name
      );

      if (updatedTask) {
        updatedTask.activityLog.unshift({
          id: `act-${Date.now()}-res`,
          timestamp: new Date().toISOString(),
          actor: activeUser.name,
          action: 'Submitted Resolution Evidence',
          details: 'Uploaded post-repair proof. Task transitioned to Awaiting Verification.'
        });
      }

      res.json(updatedTask);
    } catch (err: any) {
      console.error('[Server] Error resolving task:', err);
      res.status(500).json({ error: err.message || 'Error processing resolution' });
    }
  });

  // Human Verification Review (Reviewer / Lead)
  app.post('/api/tasks/:id/verify', (req: Request, res: Response) => {
    const { decision, feedback } = req.body;
    if (!decision || (decision !== 'approved' && decision !== 'rejected')) {
      return res.status(400).json({ error: "Decision must be 'approved' or 'rejected'" });
    }

    const task = storage.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const activeUser = storage.getUserById(activeUserId) || storage.getUsers()[0];
    const newStatus: TaskStatus = decision === 'approved' ? 'resolved' : 'reopened';

    const verificationReview = {
      reviewedBy: activeUser,
      reviewedAt: new Date().toISOString(),
      decision,
      feedback: feedback || (decision === 'approved' ? 'Resolution inspected and signed off.' : 'Remediation insufficient, returned for rework.')
    };

    const updatedTask = storage.updateTask(
      task.id,
      {
        status: newStatus,
        verificationReview
      },
      activeUser.name
    );

    if (updatedTask) {
      updatedTask.activityLog.unshift({
        id: `act-${Date.now()}-ver`,
        timestamp: new Date().toISOString(),
        actor: activeUser.name,
        action: decision === 'approved' ? 'Verified & Approved Resolution' : 'Verification Rejected (Reopened)',
        details: feedback ? `Review note: "${feedback}"` : 'Official human verification review completed.'
      });
    }

    res.json(updatedTask);
  });

  // AI Multimodal Issue Analysis
  app.post('/api/ai/analyze-issue', async (req: Request, res: Response) => {
    try {
      const { title, description, workspaceId, location, category, imageBase64, imageMimeType, voiceText } = req.body;
      if (!description && !voiceText) {
        return res.status(400).json({ error: 'Issue description or voice note text is required' });
      }

      const analysis = await analyzeIssueWithAI({
        title,
        description: description || voiceText || '',
        workspaceId: workspaceId || 'ranchers',
        location,
        category,
        imageBase64,
        imageMimeType: imageMimeType || 'image/jpeg',
        voiceText
      });

      res.json(analysis);
    } catch (err: any) {
      console.error('[Server] AI issue analysis failed:', err);
      res.status(500).json({ error: err.message || 'AI analysis failed' });
    }
  });

  // AI Audio Transcription
  app.post('/api/ai/transcribe-voice', async (req: Request, res: Response) => {
    try {
      const { audioBase64, mimeType } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ error: 'audioBase64 is required' });
      }

      const result = await transcribeAudioWithAI({
        audioBase64,
        mimeType: mimeType || 'audio/webm'
      });

      res.json(result);
    } catch (err: any) {
      console.error('[Server] Audio transcription failed:', err);
      res.status(500).json({ error: err.message || 'Audio transcription failed' });
    }
  });

  // Reset Demo Data
  app.post('/api/reset-demo-data', (req: Request, res: Response) => {
    const refreshed = storage.resetToDefaultSeed();
    res.json({ message: 'Database reset to initial demo seeds successfully', tasksCount: refreshed.tasks.length });
  });

  // -------------------------------------------------------------
  // Dev / Production Frontend Mounting
  // -------------------------------------------------------------
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[OpsPilot AI] Server operational at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[OpsPilot AI] Fatal server startup error:', err);
  process.exit(1);
});
