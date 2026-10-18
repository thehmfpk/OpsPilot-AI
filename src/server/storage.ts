import fs from 'fs';
import path from 'path';
import { Task, User, Workspace, DashboardStats, WorkspaceId, TaskStatus, Priority, ActivityEvent } from '../types';
import { WORKSPACES, DEMO_USERS, INITIAL_TASKS } from '../utils/sampleData';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'opspilot-db.json');

interface DatabaseSchema {
  workspaces: Workspace[];
  users: User[];
  tasks: Task[];
  lastUpdated: string;
}

class StorageEngine {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.tasks) && parsed.tasks.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('[Storage] Failed to read existing database file, re-initializing from seed:', err);
    }

    const initial: DatabaseSchema = {
      workspaces: WORKSPACES,
      users: DEMO_USERS,
      tasks: INITIAL_TASKS,
      lastUpdated: new Date().toISOString()
    };
    this.saveDatabase(initial);
    return initial;
  }

  private saveDatabase(dataToSave?: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const data = dataToSave || this.data;
      data.lastUpdated = new Date().toISOString();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Storage] Error persisting database file:', err);
    }
  }

  public resetToDefaultSeed(): DatabaseSchema {
    this.data = {
      workspaces: WORKSPACES,
      users: DEMO_USERS,
      tasks: INITIAL_TASKS,
      lastUpdated: new Date().toISOString()
    };
    this.saveDatabase();
    return this.data;
  }

  public getWorkspaces(): Workspace[] {
    return this.data.workspaces;
  }

  public getWorkspace(id: WorkspaceId): Workspace | undefined {
    return this.data.workspaces.find((w) => w.id === id);
  }

  public getUsers(workspaceId?: WorkspaceId): User[] {
    if (!workspaceId) return this.data.users;
    return this.data.users.filter((u) => u.workspaceId === workspaceId);
  }

  public getUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public getTasks(filter?: {
    workspaceId?: WorkspaceId;
    status?: TaskStatus;
    category?: string;
    priority?: Priority;
    assignedTeam?: string;
    search?: string;
  }): Task[] {
    let tasks = [...this.data.tasks];

    if (filter?.workspaceId) {
      tasks = tasks.filter((t) => t.workspaceId === filter.workspaceId);
    }

    if (filter?.status) {
      tasks = tasks.filter((t) => t.status === filter.status);
    }

    if (filter?.category && filter.category !== 'all') {
      tasks = tasks.filter((t) => t.category === filter.category);
    }

    if (filter?.priority && filter.priority !== ('all' as any)) {
      tasks = tasks.filter((t) => t.priority === filter.priority);
    }

    if (filter?.assignedTeam && filter.assignedTeam !== 'all') {
      tasks = tasks.filter((t) => t.assignedTeam === filter.assignedTeam);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.ticketNumber.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getTaskById(id: string): Task | undefined {
    return this.data.tasks.find((t) => t.id === id);
  }

  public createTask(taskData: Omit<Task, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'comments' | 'activityLog'>): Task {
    const workspacePrefix = taskData.workspaceId === 'ranchers' ? 'RAN' : 'COL';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const ticketNumber = `${workspacePrefix}-2026-${randomNum}`;
    const now = new Date().toISOString();

    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      ticketNumber,
      comments: [],
      activityLog: [
        {
          id: `act-${Date.now()}-1`,
          timestamp: now,
          actor: taskData.reporter.name,
          action: 'Issue Reported',
          details: `Ticket ${ticketNumber} created via ${taskData.reportingMethod} report.`
        }
      ],
      createdAt: now,
      updatedAt: now
    };

    if (taskData.aiAnalysis) {
      newTask.activityLog.push({
        id: `act-${Date.now()}-2`,
        timestamp: now,
        actor: 'OpsPilot AI Engine',
        action: 'AI Safety & Root Cause Analysis',
        details: `Assessed as ${taskData.aiAnalysis.recommendedPriority.toUpperCase()} priority (${taskData.aiAnalysis.confidenceScore}% confidence).`
      });
    }

    this.data.tasks.unshift(newTask);
    this.saveDatabase();
    return newTask;
  }

  public updateTask(id: string, updates: Partial<Task>, actorName = 'System'): Task | null {
    const index = this.data.tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const current = this.data.tasks[index];
    const now = new Date().toISOString();
    const activityEvents: ActivityEvent[] = [...current.activityLog];

    if (updates.status && updates.status !== current.status) {
      activityEvents.unshift({
        id: `act-${Date.now()}-${Math.random()}`,
        timestamp: now,
        actor: actorName,
        action: 'Status Changed',
        details: `Changed status from ${current.status} to ${updates.status}.`,
        previousState: current.status,
        newState: updates.status
      });
    }

    if (updates.assignee && updates.assignee.id !== current.assignee?.id) {
      activityEvents.unshift({
        id: `act-${Date.now()}-${Math.random()}`,
        timestamp: now,
        actor: actorName,
        action: 'Assignee Changed',
        details: `Assigned to ${updates.assignee.name} (${updates.assignee.title}).`
      });
    }

    if (updates.priority && updates.priority !== current.priority) {
      activityEvents.unshift({
        id: `act-${Date.now()}-${Math.random()}`,
        timestamp: now,
        actor: actorName,
        action: 'Priority Updated',
        details: `Updated priority to ${updates.priority.toUpperCase()}.`
      });
    }

    const updatedTask: Task = {
      ...current,
      ...updates,
      activityLog: activityEvents,
      updatedAt: now
    };

    this.data.tasks[index] = updatedTask;
    this.saveDatabase();
    return updatedTask;
  }

  public addComment(taskId: string, author: User, content: string, isInternal = false): Task | null {
    const task = this.getTaskById(taskId);
    if (!task) return null;

    const newComment = {
      id: `comm-${Date.now()}`,
      author,
      content,
      createdAt: new Date().toISOString(),
      isInternal
    };

    task.comments.push(newComment);
    task.activityLog.unshift({
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: author.name,
      action: 'Added Progress Note',
      details: content.length > 60 ? `${content.slice(0, 60)}...` : content
    });
    task.updatedAt = new Date().toISOString();

    this.saveDatabase();
    return task;
  }

  public getDashboardStats(workspaceId: WorkspaceId): DashboardStats {
    const tasks = this.data.tasks.filter((t) => t.workspaceId === workspaceId);
    const now = new Date().getTime();

    const priorityBreakdown: Record<Priority, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };

    const statusBreakdown: Record<TaskStatus, number> = {
      reported: 0,
      needs_review: 0,
      assigned: 0,
      in_progress: 0,
      awaiting_verification: 0,
      resolved: 0,
      reopened: 0,
      cancelled: 0
    };

    const categoryBreakdown: Record<string, number> = {};

    let totalResolutionHours = 0;
    let resolvedWithDurationCount = 0;
    let verifiedCount = 0;
    let approvedVerificationCount = 0;
    let overdueCount = 0;

    tasks.forEach((t) => {
      priorityBreakdown[t.priority] = (priorityBreakdown[t.priority] || 0) + 1;
      statusBreakdown[t.status] = (statusBreakdown[t.status] || 0) + 1;
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + 1;

      if (t.status !== 'resolved' && t.status !== 'cancelled') {
        if (new Date(t.dueAt).getTime() < now) {
          overdueCount++;
        }
      }

      if (t.status === 'resolved') {
        const start = new Date(t.createdAt).getTime();
        const end = new Date(t.updatedAt).getTime();
        const diffHours = Math.max(0.5, (end - start) / (1000 * 60 * 60));
        totalResolutionHours += diffHours;
        resolvedWithDurationCount++;
      }

      if (t.verificationReview) {
        verifiedCount++;
        if (t.verificationReview.decision === 'approved') {
          approvedVerificationCount++;
        }
      }
    });

    const openTasks = tasks.filter(
      (t) => t.status === 'reported' || t.status === 'needs_review' || t.status === 'assigned'
    ).length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const awaitingVerification = tasks.filter((t) => t.status === 'awaiting_verification').length;
    const resolvedCount = tasks.filter((t) => t.status === 'resolved').length;
    const criticalPriorityCount = tasks.filter((t) => t.priority === 'critical').length;

    const mttrHours = resolvedWithDurationCount > 0 ? Number((totalResolutionHours / resolvedWithDurationCount).toFixed(1)) : 3.2;
    const verificationPassRate = verifiedCount > 0 ? Math.round((approvedVerificationCount / verifiedCount) * 100) : 95;

    // Collate recent activity across workspace tasks
    const allActivities: ActivityEvent[] = [];
    tasks.forEach((t) => {
      t.activityLog.forEach((act) => {
        allActivities.push({
          ...act,
          details: act.details ? `[${t.ticketNumber}] ${act.details}` : `[${t.ticketNumber}]`
        });
      });
    });

    allActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return {
      totalIssues: tasks.length,
      openTasks,
      inProgress,
      awaitingVerification,
      resolvedCount,
      criticalPriorityCount,
      overdueCount,
      verificationPassRate,
      mttrHours,
      priorityBreakdown,
      statusBreakdown,
      categoryBreakdown,
      recentActivity: allActivities.slice(0, 15)
    };
  }
}

export const storage = new StorageEngine();
