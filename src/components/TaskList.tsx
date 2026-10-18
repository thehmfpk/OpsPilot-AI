import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  LayoutList,
  Kanban,
  CheckCircle2,
  Clock,
  Hourglass,
  AlertTriangle,
  ChevronRight,
  User,
  ShieldCheck,
  Calendar,
  MapPin
} from 'lucide-react';
import { Task, TaskStatus, Priority, Workspace } from '../types';

interface TaskListProps {
  tasks: Task[];
  workspace: Workspace;
  onSelectTask: (task: Task) => void;
  onOpenReportModal: () => void;
  initialStatusFilter?: TaskStatus;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  workspace,
  onSelectTask,
  onOpenReportModal,
  initialStatusFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter || 'all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (statusFilter !== 'all' && task.status !== statusFilter) return false;
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
      if (teamFilter !== 'all' && task.assignedTeam !== teamFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          task.title.toLowerCase().includes(q) ||
          task.ticketNumber.toLowerCase().includes(q) ||
          task.location.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q) ||
          task.assignedTeam.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [tasks, statusFilter, priorityFilter, categoryFilter, teamFilter, searchQuery]);

  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold text-red-700 bg-red-50 border border-red-200">CRITICAL</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200">HIGH</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-200">MEDIUM</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200">LOW</span>;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'awaiting_verification':
        return (
          <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold flex items-center gap-1.5 w-fit">
            <Hourglass className="w-3.5 h-3.5 text-amber-600" />
            <span>Awaiting Verification</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold flex items-center gap-1.5 w-fit">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>In Progress</span>
          </span>
        );
      case 'resolved':
        return (
          <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold flex items-center gap-1.5 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Resolved</span>
          </span>
        );
      case 'assigned':
        return <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md font-mono text-[11px]">Assigned</span>;
      case 'needs_review':
        return <span className="text-yellow-800 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-md font-mono text-[11px]">Needs Review</span>;
      default:
        return <span className="text-slate-600 font-mono text-[11px] capitalize">{status}</span>;
    }
  };

  const kanbanColumns: { status: TaskStatus; title: string }[] = [
    { status: 'assigned', title: 'Assigned' },
    { status: 'in_progress', title: 'In Progress' },
    { status: 'awaiting_verification', title: 'Awaiting Sign-off' },
    { status: 'resolved', title: 'Resolved' }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Search Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Operations Tasks
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Tracking {filteredTasks.length} operational issues across {workspace.name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table List View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Issue</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets, components, locations, or notes..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs"
          />
        </div>

        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-slate-900 shadow-2xs cursor-pointer font-medium"
        >
          <option value="all">All Statuses</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="awaiting_verification">Awaiting Verification</option>
          <option value="resolved">Resolved</option>
        </select>

        {/* Priority Dropdown */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-slate-900 shadow-2xs cursor-pointer font-medium"
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Team Dropdown */}
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-slate-900 shadow-2xs cursor-pointer font-medium"
        >
          <option value="all">All Teams</option>
          {workspace.teams.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Reset Filter Button */}
        {(statusFilter !== 'all' ||
          priorityFilter !== 'all' ||
          categoryFilter !== 'all' ||
          teamFilter !== 'all' ||
          searchQuery !== '') && (
          <button
            onClick={() => {
              setStatusFilter('all');
              setPriorityFilter('all');
              setCategoryFilter('all');
              setTeamFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-slate-500 hover:text-slate-900 underline cursor-pointer font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* VIEW: Table Mode */}
      {viewMode === 'table' && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/80">
                  <th className="py-3 px-4">Ticket</th>
                  <th className="py-3 px-4">Issue Summary & Location</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Responsible Team</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                      No operational tasks match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      onClick={() => onSelectTask(task)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {task.ticketNumber}
                      </td>
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="font-bold text-slate-900 truncate">{task.title}</div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{task.location} · {task.category}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {getPriorityBadge(task.priority)}
                      </td>
                      <td className="py-3.5 px-4">{getStatusBadge(task.status)}</td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{task.assignedTeam}</td>
                      <td className="py-3.5 px-4">
                        {task.assignee ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-5 h-5 rounded-full object-cover border border-slate-200"
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-slate-800 font-medium truncate max-w-[120px]">
                              {task.assignee.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <ChevronRight className="w-4 h-4 text-slate-400 inline-block" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW: Kanban Board Mode */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.status);
            return (
              <div
                key={col.status}
                className="rounded-2xl border border-slate-200 bg-slate-100/60 p-3.5 flex flex-col space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 px-1">
                  <span className="text-xs font-bold text-slate-800">{col.title}</span>
                  <span className="text-xs font-mono font-bold tabular-nums text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[650px] pr-1">
                  {colTasks.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-400 font-medium">
                      No tasks in this lane
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onSelectTask(task)}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs cursor-pointer transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono font-bold text-slate-900">{task.ticketNumber}</span>
                          {getPriorityBadge(task.priority)}
                        </div>
                        <div className="text-xs font-bold text-slate-900 line-clamp-2">
                          {task.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-600">
                          <span className="truncate max-w-[130px] font-medium">{task.assignedTeam}</span>
                          {task.assignee && (
                            <img
                              src={task.assignee.avatar}
                              alt=""
                              title={task.assignee.name}
                              className="w-4 h-4 rounded-full object-cover border border-slate-200"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
