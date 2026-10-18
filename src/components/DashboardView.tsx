import React from 'react';
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  Hourglass,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Users,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { DashboardStats, Workspace, Task, Priority, TaskStatus } from '../types';

interface DashboardViewProps {
  stats: DashboardStats;
  tasks: Task[];
  workspace: Workspace;
  onSelectTask: (task: Task) => void;
  onNavigateToTasks: (filterStatus?: TaskStatus) => void;
  onNavigateToVerification: () => void;
  onOpenReportModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  tasks,
  workspace,
  onSelectTask,
  onNavigateToTasks,
  onNavigateToVerification,
  onOpenReportModal
}) => {
  const getPriorityStyle = (priority: Priority) => {
    switch (priority) {
      case 'critical':
        return 'text-red-700 bg-red-50 border border-red-200 font-bold';
      case 'high':
        return 'text-amber-700 bg-amber-50 border border-amber-200 font-semibold';
      case 'medium':
        return 'text-blue-700 bg-blue-50 border border-blue-200 font-medium';
      case 'low':
        return 'text-slate-600 bg-slate-100 border border-slate-200';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'awaiting_verification':
        return 'Awaiting Sign-off';
      case 'in_progress':
        return 'In Progress';
      case 'assigned':
        return 'Assigned';
      case 'needs_review':
        return 'Needs Review';
      case 'reported':
        return 'Reported';
      case 'resolved':
        return 'Resolved';
      case 'reopened':
        return 'Reopened';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  const urgentTasks = tasks
    .filter((t) => t.status !== 'resolved' && t.status !== 'cancelled')
    .sort((a, b) => {
      const pWeights = { critical: 4, high: 3, medium: 2, low: 1 };
      return pWeights[b.priority] - pWeights[a.priority];
    })
    .slice(0, 5);

  return (
    <div className="space-y-8 pb-16">
      {/* Workspace Context Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
            Operational Intelligence Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            {workspace.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {workspace.tagline} · {workspace.domain}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToVerification}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Verification Queue ({stats.awaitingVerification})</span>
          </button>
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shadow-sm cursor-pointer"
          >
            <span>Report Issue</span>
          </button>
        </div>
      </div>

      {/* KPI Numerical Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Issues */}
        <div
          onClick={() => onNavigateToTasks()}
          className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-all shadow-2xs hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-semibold">
            <span>Total Reported</span>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {stats.totalIssues}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Active: {stats.openTasks + stats.inProgress}</span>
            <span className="text-slate-400">All Time</span>
          </div>
        </div>

        {/* In Progress */}
        <div
          onClick={() => onNavigateToTasks('in_progress')}
          className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-all shadow-2xs hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-semibold">
            <span>In Progress</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-blue-600">
            {stats.inProgress}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Field Remediation</span>
            <span className="text-slate-600 font-medium">{stats.openTasks} queued</span>
          </div>
        </div>

        {/* Awaiting Verification */}
        <div
          onClick={onNavigateToVerification}
          className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-all shadow-2xs hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-semibold">
            <span>Awaiting Verification</span>
            <Hourglass className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-amber-600">
            {stats.awaitingVerification}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Needs Reviewer Sign-off</span>
            <span className="text-amber-700 font-semibold">Review Proof →</span>
          </div>
        </div>

        {/* Resolved & Pass Rate */}
        <div
          onClick={() => onNavigateToTasks('resolved')}
          className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-all shadow-2xs hover:shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-semibold">
            <span>Verified Resolutions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-600">
            {stats.resolvedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Pass Rate: {stats.verificationPassRate}%</span>
            <span>Avg MTTR: {stats.mttrHours}h</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Attention Queue & Operational Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Urgent Operational Incidents */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Urgent Attention Queue
              </h2>
              <span className="text-xs font-mono text-slate-500">
                ({urgentTasks.length})
              </span>
            </div>
            <button
              onClick={() => onNavigateToTasks()}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              View All Tasks →
            </button>
          </div>

          <div className="space-y-2.5">
            {urgentTasks.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-slate-200 bg-white text-xs text-slate-500">
                No outstanding urgent tasks. All active items resolved.
              </div>
            ) : (
              urgentTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-slate-900 font-bold">
                        {task.ticketNumber}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${getPriorityStyle(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{task.location}</span>
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 truncate">
                      {task.title}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-3">
                      <span>Team: <strong className="text-slate-700">{task.assignedTeam}</strong></span>
                      {task.assignee && (
                        <span>Assignee: <strong className="text-slate-700">{task.assignee.name}</strong></span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-right space-y-1">
                    <div className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {getStatusLabel(task.status)}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Teams Directory Preview */}
          <div className="pt-6">
            <h2 className="text-base font-bold text-slate-900 mb-3">
              Configured Teams for {workspace.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workspace.teams.map((team) => (
                <div
                  key={team.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{team.name}</span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Lead: {team.leadName}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {team.description}
                  </p>
                  <div className="flex items-center gap-1.5 pt-1">
                    {team.members.map((member) => (
                      <img
                        key={member.userId}
                        src={member.avatar}
                        alt={member.name}
                        title={`${member.name} (${member.role})`}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                    <span className="text-[11px] text-slate-500 ml-2 font-medium">
                      {team.members.length} members
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Status Breakdown & Activity Stream */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Breakdown Bar */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Issue Status Distribution
            </h3>

            <div className="space-y-3">
              {Object.entries(stats.statusBreakdown).map(([statusKey, count]) => {
                if (count === 0 && statusKey === 'cancelled') return null;
                const percentage = stats.totalIssues > 0 ? Math.round((count / stats.totalIssues) * 100) : 0;
                return (
                  <div key={statusKey} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                      <span className="capitalize">{getStatusLabel(statusKey as TaskStatus)}</span>
                      <span className="font-mono tabular-nums text-slate-500">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          statusKey === 'resolved'
                            ? 'bg-emerald-500'
                            : statusKey === 'awaiting_verification'
                            ? 'bg-amber-500'
                            : statusKey === 'in_progress'
                            ? 'bg-blue-500'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${Math.max(percentage, count > 0 ? 5 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chronological Activity Stream */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" />
              <span>Operational Audit Trail</span>
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {stats.recentActivity.slice(0, 7).map((act) => (
                <div key={act.id} className="text-xs space-y-0.5 border-l-2 border-slate-200 pl-3">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-bold text-slate-800">{act.actor}</span>
                    <span className="font-mono text-[10px]">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-slate-900 font-semibold">{act.action}</div>
                  {act.details && (
                    <div className="text-[11px] text-slate-600 line-clamp-2">
                      {act.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
