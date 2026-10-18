export type WorkspaceId = 'ranchers' | 'colabs';

export type Role = 'reporter' | 'technician' | 'reviewer' | 'admin';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export type TaskStatus = 
  | 'reported'
  | 'needs_review'
  | 'assigned'
  | 'in_progress'
  | 'awaiting_verification'
  | 'resolved'
  | 'reopened'
  | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  title: string;
  avatar: string;
  workspaceId: WorkspaceId;
}

export interface TeamMember {
  userId: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  activeTasksCount: number;
}

export interface Team {
  id: string;
  name: string;
  workspaceId: WorkspaceId;
  description: string;
  leadName: string;
  members: TeamMember[];
}

export interface Workspace {
  id: WorkspaceId;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  locations: string[];
  categories: string[];
  teams: Team[];
}

export interface AIAnalysisResult {
  provider: 'ai' | 'simulated';
  issueSummary: string;
  detectedType: string;
  suggestedCategory: string;
  recommendedPriority: Priority;
  safetyWarnings: string[];
  suggestedSteps: string[];
  recommendedTeam: string;
  estimatedEffort: string;
  confidenceScore: number;
  limitations: string;
}

export interface AIComparisonResult {
  provider: 'ai' | 'simulated';
  observableChanges: string[];
  unresolvedConcerns: string[];
  safetyCheckPassed: boolean;
  inspectionScore: number;
  aiRecommendation: 'recommend_approval' | 'recommend_rejection' | 'requires_human_inspection';
  remarks: string;
}

export interface ResolutionSubmission {
  submittedBy: User;
  submittedAt: string;
  completionNotes: string;
  partsUsed?: string;
  resolutionEvidenceUrl: string;
  aiComparison?: AIComparisonResult;
}

export interface VerificationReview {
  reviewedBy: User;
  reviewedAt: string;
  decision: 'approved' | 'rejected';
  feedback: string;
}

export interface TaskComment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  isInternal?: boolean;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details?: string;
  previousState?: string;
  newState?: string;
}

export interface Task {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  workspaceId: WorkspaceId;
  location: string;
  category: string;
  priority: Priority;
  status: TaskStatus;
  reportingMethod: 'photo' | 'voice' | 'text';
  originalEvidenceUrl?: string;
  voiceTranscription?: string;
  voiceAudioUrl?: string;
  aiAnalysis?: AIAnalysisResult;
  assignedTeam: string;
  assignee?: User;
  reporter: User;
  dueAt: string;
  resolutionSubmission?: ResolutionSubmission;
  verificationReview?: VerificationReview;
  comments: TaskComment[];
  activityLog: ActivityEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalIssues: number;
  openTasks: number;
  inProgress: number;
  awaitingVerification: number;
  resolvedCount: number;
  criticalPriorityCount: number;
  overdueCount: number;
  verificationPassRate: number;
  mttrHours: number;
  priorityBreakdown: Record<Priority, number>;
  statusBreakdown: Record<TaskStatus, number>;
  categoryBreakdown: Record<string, number>;
  recentActivity: ActivityEvent[];
}

export interface AIProviderStatus {
  aiAvailable: boolean;
  statusText: string;
  hasApiKey: boolean;
  isDemoMode: boolean;
}
