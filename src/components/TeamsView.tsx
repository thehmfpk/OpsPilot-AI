import React from 'react';
import { Users, Mail, CheckCircle2, Clock, ShieldAlert, Award, MapPin } from 'lucide-react';
import { Workspace, Task } from '../types';

interface TeamsViewProps {
  workspace: Workspace;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ workspace, tasks, onSelectTask }) => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Operational Teams & Workload Directory
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Specialized response squads for {workspace.name} ({workspace.domain})
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workspace.teams.map((team) => {
          const teamTasks = tasks.filter((t) => t.assignedTeam === team.name);
          const activeTasks = teamTasks.filter((t) => t.status !== 'resolved' && t.status !== 'cancelled');
          const resolvedTasks = teamTasks.filter((t) => t.status === 'resolved');

          return (
            <div
              key={team.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between space-y-5 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {team.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{team.name}</h3>
                      <div className="text-[11px] text-slate-500 font-medium">Lead: {team.leadName}</div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold tabular-nums text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    {activeTasks.length} active tasks
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{team.description}</p>

                {/* Team Roster */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Team Members & Response Specialists
                  </div>
                  <div className="space-y-2">
                    {team.members.map((member) => (
                      <div
                        key={member.userId}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{member.name}</div>
                            <div className="text-[11px] text-slate-500">{member.role}</div>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-slate-600 font-semibold bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          {tasks.filter((t) => t.assignee?.id === member.userId && t.status !== 'resolved').length} open
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Workload Metric */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Total Assigned: <strong className="text-slate-700">{teamTasks.length}</strong></span>
                <span className="text-emerald-700 font-mono font-bold">
                  {resolvedTasks.length} Resolved ({teamTasks.length > 0 ? Math.round((resolvedTasks.length / teamTasks.length) * 100) : 100}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
