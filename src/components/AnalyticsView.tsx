import React from 'react';
import { BarChart3, TrendingUp, Clock, CheckCircle2, ShieldCheck, PieChart } from 'lucide-react';
import { DashboardStats, Workspace } from '../types';

interface AnalyticsViewProps {
  stats: DashboardStats;
  workspace: Workspace;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ stats, workspace }) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Operational Analytics & MTTR Intelligence
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Turnaround velocity, SLA compliance, and resolution ratios for {workspace.name}
        </p>
      </div>

      {/* KPI Headline Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="text-xs text-slate-500 mb-1 font-semibold">Mean Time to Resolution (MTTR)</div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {stats.mttrHours} <span className="text-sm font-sans font-normal text-slate-500">hours</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-2 font-medium">
            Target SLA: &lt; 4.0h · Nominal Velocity
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="text-xs text-slate-500 mb-1 font-semibold">Verification Approval Rate</div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-600">
            {stats.verificationPassRate}%
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            First-Pass Sign-off Success
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="text-xs text-slate-500 mb-1 font-semibold">Total Reported Incidents</div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {stats.totalIssues}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Across {workspace.locations.length} tracked locations
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="text-xs text-slate-500 mb-1 font-semibold">Critical Priority Incidents</div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-red-600">
            {stats.criticalPriorityCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Overdue: {stats.overdueCount} items
          </div>
        </div>
      </div>

      {/* Breakdown Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-slate-500" />
            <span>Incidents by Operational Category</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(stats.categoryBreakdown).map(([cat, count]) => {
              const pct = stats.totalIssues > 0 ? Math.round((count / stats.totalIssues) * 100) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-medium">{cat}</span>
                    <span className="font-mono tabular-nums text-slate-500 font-semibold">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-700"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Severity Breakdown */}
        <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-500" />
            <span>Priority Severity Breakdown</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(stats.priorityBreakdown).map(([priority, count]) => {
              const pct = stats.totalIssues > 0 ? Math.round((count / stats.totalIssues) * 100) : 0;
              const colorClass =
                priority === 'critical'
                  ? 'bg-red-500'
                  : priority === 'high'
                  ? 'bg-amber-500'
                  : priority === 'medium'
                  ? 'bg-blue-500'
                  : 'bg-slate-400';

              return (
                <div key={priority} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-medium capitalize">{priority} Priority</span>
                    <span className="font-mono tabular-nums text-slate-500 font-semibold">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${Math.max(pct, 4)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
