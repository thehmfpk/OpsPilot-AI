import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { DashboardView } from './components/DashboardView';
import { TaskList } from './components/TaskList';
import { VerificationCenter } from './components/VerificationCenter';
import { TeamsView } from './components/TeamsView';
import { AnalyticsView } from './components/AnalyticsView';
import { IssueReportWizard } from './components/IssueReportWizard';
import { TaskDetailModal } from './components/TaskDetailModal';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import {
  Workspace,
  WorkspaceId,
  User,
  Task,
  DashboardStats,
  AIProviderStatus,
  TaskStatus
} from './types';
import { WORKSPACES, DEMO_USERS } from './utils/sampleData';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'tasks' | 'verification' | 'teams' | 'analytics' | 'landing'
  >('dashboard');

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<WorkspaceId>('ranchers');
  const [workspaces, setWorkspaces] = useState<Workspace[]>(WORKSPACES);
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS[0]);
  const [allUsers, setAllUsers] = useState<User[]>(DEMO_USERS);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [aiStatus, setAiStatus] = useState<AIProviderStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Inspection State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [initialTaskListFilter, setInitialTaskListFilter] = useState<TaskStatus | undefined>(undefined);

  const activeWorkspace =
    workspaces.find((w) => w.id === currentWorkspaceId) || workspaces[0];

  // Fetch Core Data
  const fetchData = useCallback(async () => {
    try {
      // 1. Fetch AI Provider Status
      fetch('/api/ai/status')
        .then((r) => r.json())
        .then((data) => setAiStatus(data))
        .catch((e) => console.warn('Could not fetch AI status:', e));

      // 2. Fetch Workspaces
      fetch('/api/workspaces')
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) setWorkspaces(data);
        })
        .catch((e) => console.warn('Could not fetch workspaces:', e));

      // 3. Fetch Users & Current Auth
      fetch('/api/users')
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) setAllUsers(data);
        })
        .catch((e) => console.warn('Could not fetch users:', e));

      fetch('/api/auth/current')
        .then((r) => r.json())
        .then((data) => {
          if (data && data.id) setCurrentUser(data);
        })
        .catch((e) => console.warn('Could not fetch current user:', e));

      // 4. Fetch Tasks & Stats for active workspace
      const [tasksRes, statsRes] = await Promise.all([
        fetch(`/api/tasks?workspaceId=${currentWorkspaceId}`),
        fetch(`/api/dashboard/stats?workspaceId=${currentWorkspaceId}`)
      ]);

      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        setTasks(tasksData);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error('Error fetching application state:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspaceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Keep selectedTask in sync with tasks list
  useEffect(() => {
    if (selectedTask) {
      const refreshed = tasks.find((t) => t.id === selectedTask.id);
      if (refreshed) {
        setSelectedTask(refreshed);
      }
    }
  }, [tasks]);

  // Persona Switch Handler
  const handleSwitchUser = async (userId: string) => {
    try {
      const res = await fetch('/api/auth/switch-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (res.ok) {
        const updated = await res.json();
        setCurrentUser(updated);
      }
    } catch (err) {
      console.error('Failed to switch user:', err);
    }
  };

  // Task Update Handler
  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  // Add Comment Handler
  const handleAddComment = async (taskId: string, content: string, isInternal: boolean) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, isInternal })
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
        setSelectedTask(updated);
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  // Submit Resolution Evidence Handler
  const handleSubmitResolution = async (
    taskId: string,
    notes: string,
    parts: string,
    photoUrl: string
  ) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completionNotes: notes,
          partsUsed: parts,
          resolutionEvidenceUrl: photoUrl
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
        setSelectedTask(updated);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to submit resolution:', err);
    }
  };

  // Verification Review Decision Handler
  const handleVerifyResolution = async (
    taskId: string,
    decision: 'approved' | 'rejected',
    feedback: string
  ) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, feedback })
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
        setSelectedTask(updated);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to verify resolution:', err);
    }
  };

  // Reset Demo Data
  const handleResetData = async () => {
    const res = await fetch('/api/reset-demo-data', { method: 'POST' });
    if (res.ok) {
      await fetchData();
    }
  };

  const awaitingVerificationCount = tasks.filter(
    (t) => t.status === 'awaiting_verification'
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentWorkspace={currentWorkspaceId}
        setCurrentWorkspace={(ws) => {
          setCurrentWorkspaceId(ws);
          if (activeTab === 'landing') setActiveTab('dashboard');
        }}
        currentUser={currentUser}
        allUsers={allUsers}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        aiStatus={aiStatus}
        awaitingVerificationCount={awaitingVerificationCount}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'landing' ? (
          <LandingHero
            onStartReporting={() => setIsReportModalOpen(true)}
            onExploreDashboard={() => setActiveTab('dashboard')}
            onSelectWorkspace={(ws) => {
              setCurrentWorkspaceId(ws);
              setActiveTab('dashboard');
            }}
          />
        ) : activeTab === 'dashboard' && stats ? (
          <DashboardView
            stats={stats}
            tasks={tasks}
            workspace={activeWorkspace}
            onSelectTask={(task) => setSelectedTask(task)}
            onNavigateToTasks={(filterStatus) => {
              setInitialTaskListFilter(filterStatus);
              setActiveTab('tasks');
            }}
            onNavigateToVerification={() => setActiveTab('verification')}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        ) : activeTab === 'tasks' ? (
          <TaskList
            tasks={tasks}
            workspace={activeWorkspace}
            onSelectTask={(task) => setSelectedTask(task)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            initialStatusFilter={initialTaskListFilter}
          />
        ) : activeTab === 'verification' ? (
          <VerificationCenter
            tasks={tasks}
            workspace={activeWorkspace}
            currentUser={currentUser}
            onVerifyResolution={handleVerifyResolution}
            onSelectTask={(task) => setSelectedTask(task)}
          />
        ) : activeTab === 'teams' ? (
          <TeamsView
            workspace={activeWorkspace}
            tasks={tasks}
            onSelectTask={(task) => setSelectedTask(task)}
          />
        ) : activeTab === 'analytics' && stats ? (
          <AnalyticsView stats={stats} workspace={activeWorkspace} />
        ) : (
          <div className="py-20 text-center text-slate-500 font-mono text-xs">
            Loading OpsPilot AI Environment...
          </div>
        )}
      </main>

      {/* Issue Reporting Wizard Modal */}
      <IssueReportWizard
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        currentWorkspace={activeWorkspace}
        currentUser={currentUser}
        onTaskCreated={(newTask) => {
          setTasks((prev) => [newTask, ...prev]);
          fetchData();
        }}
      />

      {/* Task Detailed Inspection Modal */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        workspace={activeWorkspace}
        currentUser={currentUser}
        onUpdateTask={handleUpdateTask}
        onAddComment={handleAddComment}
        onSubmitResolution={handleSubmitResolution}
        onVerifyResolution={handleVerifyResolution}
      />

      {/* Auth & Persona Switcher Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        allUsers={allUsers}
        onSelectUser={handleSwitchUser}
        currentWorkspace={currentWorkspaceId}
      />

      {/* Settings & System Diagnostics Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        aiStatus={aiStatus}
        workspace={activeWorkspace}
        onResetData={handleResetData}
      />
    </div>
  );
}
