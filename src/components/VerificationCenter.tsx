import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  History,
  FileCheck2,
  Check,
  X,
  MapPin
} from 'lucide-react';
import { Task, Workspace, User } from '../types';

interface VerificationCenterProps {
  tasks: Task[];
  workspace: Workspace;
  currentUser: User;
  onVerifyResolution: (taskId: string, decision: 'approved' | 'rejected', feedback: string) => Promise<void>;
  onSelectTask: (task: Task) => void;
}

export const VerificationCenter: React.FC<VerificationCenterProps> = ({
  tasks,
  workspace,
  currentUser,
  onVerifyResolution,
  onSelectTask
}) => {
  const awaitingTasks = tasks.filter((t) => t.status === 'awaiting_verification');
  const verifiedTasks = tasks.filter((t) => t.status === 'resolved' && t.verificationReview);

  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    awaitingTasks[0]?.id || verifiedTasks[0]?.id || ''
  );
  const [reviewNotes, setReviewNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const activeTask = tasks.find((t) => t.id === selectedTaskId) || awaitingTasks[0] || verifiedTasks[0];

  const handleApprove = async () => {
    if (!activeTask) return;
    setIsSubmitting(true);
    try {
      await onVerifyResolution(
        activeTask.id,
        'approved',
        reviewNotes || 'Resolution verified on site. Photographic evidence corroborates safe restoration.'
      );
      setReviewNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!activeTask || !rejectionReason.trim()) return;
    setIsSubmitting(true);
    try {
      await onVerifyResolution(activeTask.id, 'rejected', rejectionReason);
      setRejectionModalOpen(false);
      setRejectionReason('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Dual-Gate Verification Center</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
            Evidence-Based Resolution Auditing
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Photographic delta comparison, safety inspection screening, and mandatory reviewer approval
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium">
            Pending Sign-off: <strong className="text-amber-700 font-bold tabular-nums">{awaitingTasks.length}</strong>
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
            Approved: <strong className="text-emerald-700 font-bold tabular-nums">{verifiedTasks.length}</strong>
          </span>
        </div>
      </div>

      {awaitingTasks.length === 0 && verifiedTasks.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-slate-200 bg-white text-slate-500 space-y-2 shadow-2xs">
          <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto" />
          <div className="text-sm font-bold text-slate-900">No Tasks In Verification Queue</div>
          <p className="text-xs max-w-sm mx-auto text-slate-600">
            When technicians submit after-repair evidence for assigned issues, they will appear here for side-by-side inspection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Verification Queue Selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Verification Queue ({awaitingTasks.length})
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {awaitingTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTaskId(t.id)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedTaskId === t.id
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs ring-1 ring-amber-300/60'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-slate-900 font-bold">
                      {t.ticketNumber}
                    </span>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-bold">
                      Pending Sign-off
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{t.title}</div>
                  <div className="text-[11px] text-slate-500 truncate mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{t.location} · {t.assignee?.name || 'Technician'}</span>
                  </div>
                </div>
              ))}

              {verifiedTasks.length > 0 && (
                <>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider pt-4">
                    Recently Verified ({verifiedTasks.length})
                  </div>
                  {verifiedTasks.slice(0, 5).map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTaskId(t.id)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all opacity-80 hover:opacity-100 ${
                        selectedTaskId === t.id
                          ? 'bg-slate-100 border-slate-300 font-semibold'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="font-mono text-slate-600 font-medium">{t.ticketNumber}</span>
                        <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                          Approved
                        </span>
                      </div>
                      <div className="text-xs text-slate-800 truncate">{t.title}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Right Column: Side-by-Side Comparison & Sign-off Panel */}
          {activeTask && (
            <div className="lg:col-span-8 space-y-6">
              {/* Task Header Bar */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono text-slate-900 font-bold">{activeTask.ticketNumber}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>{activeTask.location}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">{activeTask.title}</h2>
                </div>

                <button
                  onClick={() => onSelectTask(activeTask)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Open Full Ticket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Side-by-Side Evidence Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Original Evidence */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span className="text-slate-800">1. Original Issue Evidence</span>
                    <span className="text-[10px] text-red-700 font-mono bg-red-50 border border-red-200 px-1.5 py-0.2 rounded font-bold">
                      Reported
                    </span>
                  </div>

                  <div className="h-60 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center relative">
                    {activeTask.originalEvidenceUrl ? (
                      <img
                        src={activeTask.originalEvidenceUrl}
                        alt="Original Issue"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-xs text-slate-500 text-center p-4">
                        Reported via text/voice without initial photograph
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-600 line-clamp-2 italic">
                    "{activeTask.description}"
                  </div>
                </div>

                {/* 2. Resolution Evidence */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span className="text-slate-800">2. After-Repair Evidence</span>
                    <span className="text-[10px] text-emerald-700 font-mono bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                      Remediated
                    </span>
                  </div>

                  <div className="h-60 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center relative">
                    {activeTask.resolutionSubmission?.resolutionEvidenceUrl ? (
                      <img
                        src={activeTask.resolutionSubmission.resolutionEvidenceUrl}
                        alt="Resolution Evidence"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-xs text-slate-500 text-center p-4">
                        Awaiting technician post-repair upload
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-700 line-clamp-2">
                    <strong className="text-slate-900">Technician notes: </strong>
                    {activeTask.resolutionSubmission?.completionNotes || 'None recorded.'}
                  </div>
                </div>
              </div>

              {/* AI Visual Delta & Inspection Assessment */}
              {activeTask.resolutionSubmission?.aiComparison && (
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-900">
                        Visual Delta & Safety Inspection Score
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-slate-500">Score:</span>
                      <span className="text-emerald-700 font-bold tabular-nums bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {activeTask.resolutionSubmission.aiComparison.inspectionScore} / 100
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-[11px] font-bold text-slate-700 mb-1.5">
                        Observable Remediations in Photo:
                      </div>
                      <ul className="space-y-1 text-slate-700">
                        {activeTask.resolutionSubmission.aiComparison.observableChanges.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-slate-700 mb-1.5">
                        Safety Check:
                      </div>
                      {activeTask.resolutionSubmission.aiComparison.unresolvedConcerns.length === 0 ? (
                        <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>No residual hazards or debris detected.</span>
                        </div>
                      ) : (
                        <ul className="space-y-1 text-red-700">
                          {activeTask.resolutionSubmission.aiComparison.unresolvedConcerns.map((u, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                              <span>{u}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Mandatory Human Reviewer Disclaimer */}
                  <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      Operational Policy: Visual AI scoring is an advisory check. Human operations lead sign-off is mandatory for official resolution.
                    </span>
                  </div>
                </div>
              )}

              {/* Reviewer Action Bar */}
              {activeTask.status === 'awaiting_verification' && (
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-2xs">
                  <div className="text-xs font-bold text-slate-900">
                    Lead Reviewer Inspection Decision
                  </div>

                  <div>
                    <input
                      type="text"
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Optional sign-off feedback (e.g. Inspected on site, calibration verified)..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      onClick={() => setRejectionModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold cursor-pointer transition-colors"
                    >
                      Reject & Reopen Task
                    </button>
                    <button
                      disabled={isSubmitting}
                      onClick={handleApprove}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isSubmitting ? 'Signing...' : 'Approve & Mark Resolved'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Already Verified Notice */}
              {activeTask.verificationReview && (
                <div className="p-4 rounded-2xl border border-slate-200 bg-white text-xs space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-800 font-bold">
                    <span>
                      Verification Review Status: {activeTask.verificationReview.decision.toUpperCase()}
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      Reviewed by {activeTask.verificationReview.reviewedBy.name} on{' '}
                      {new Date(activeTask.verificationReview.reviewedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600">{activeTask.verificationReview.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Rejection Feedback Modal */}
      {rejectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">
                Provide Rejection Reason
              </span>
              <button
                onClick={() => setRejectionModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              State why the remediation does not meet standards. The ticket will return to In Progress with your feedback logged for the technician.
            </p>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Work area has not been degreased, or unit temperature gauge is still oscillating..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none resize-none shadow-2xs"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectionModalOpen(false)}
                className="px-3.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting || !rejectionReason.trim()}
                onClick={handleReject}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer disabled:opacity-50 shadow-sm"
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
