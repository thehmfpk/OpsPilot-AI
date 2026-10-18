import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Hourglass,
  Calendar,
  User,
  ShieldCheck,
  Send,
  Camera,
  Upload,
  MessageSquare,
  Activity,
  FileCheck2,
  ExternalLink,
  Loader2,
  ArrowRight,
  MapPin,
  Check
} from 'lucide-react';
import { Task, User as AppUser, Workspace, TaskStatus, Priority } from '../types';

interface TaskDetailModalProps {
  task: Task | null;
  onClose: () => void;
  workspace: Workspace;
  currentUser: AppUser;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  onAddComment: (taskId: string, content: string, isInternal: boolean) => Promise<void>;
  onSubmitResolution: (taskId: string, notes: string, parts: string, photoUrl: string) => Promise<void>;
  onVerifyResolution: (taskId: string, decision: 'approved' | 'rejected', feedback: string) => Promise<void>;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  workspace,
  currentUser,
  onUpdateTask,
  onAddComment,
  onSubmitResolution,
  onVerifyResolution
}) => {
  const [commentText, setCommentText] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Resolution Form State
  const [isResolving, setIsResolving] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [partsUsed, setPartsUsed] = useState('');
  const [resolutionPhotoUrl, setResolutionPhotoUrl] = useState<string | null>(null);
  const [isSubmittingResolution, setIsSubmittingResolution] = useState(false);

  // Verification Review Form State
  const [isReviewing, setIsReviewing] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!task) return null;

  // Handle Photo Upload for Resolution
  const handleResolutionPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setResolutionPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    try {
      await onAddComment(task.id, commentText, isInternalComment);
      setCommentText('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleResolveSubmit = async () => {
    if (!resolutionNotes.trim()) return;

    setIsSubmittingResolution(true);
    try {
      await onSubmitResolution(
        task.id,
        resolutionNotes,
        partsUsed,
        resolutionPhotoUrl || task.originalEvidenceUrl || '/src/assets/images/verification_inspection_1792307335334.jpg'
      );
      setIsResolving(false);
    } finally {
      setIsSubmittingResolution(false);
    }
  };

  const handleVerificationDecision = async (decision: 'approved' | 'rejected') => {
    setIsSubmittingReview(true);
    try {
      await onVerifyResolution(task.id, decision, verificationFeedback);
      setIsReviewing(false);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-slate-900 px-2.5 py-0.5 rounded-lg bg-slate-200">
              {task.ticketNumber}
            </span>
            <span className="text-xs text-slate-500 capitalize flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{task.location} · {task.category}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Priority Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{task.title}</h2>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-md uppercase font-bold ${
                    task.priority === 'critical'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : task.priority === 'high'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {task.priority} Priority
                </span>

                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-md font-semibold ${
                    task.status === 'resolved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : task.status === 'awaiting_verification'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : task.status === 'in_progress'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {task.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
              {task.description}
            </p>
          </div>

          {/* Quick Status / Assignment Controller */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="text-slate-500 mb-1 font-semibold">Assigned Team</div>
              <select
                value={task.assignedTeam}
                onChange={(e) => onUpdateTask(task.id, { assignedTeam: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none shadow-2xs font-medium cursor-pointer"
              >
                {workspace.teams.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-slate-500 mb-1 font-semibold">Technician Assignee</div>
              <select
                value={task.assignee?.id || ''}
                onChange={(e) => {
                  const selectedUser = workspace.teams
                    .flatMap((t) => t.members)
                    .find((m) => m.userId === e.target.value);
                  onUpdateTask(task.id, {
                    assignee: selectedUser
                      ? {
                          id: selectedUser.userId,
                          name: selectedUser.name,
                          email: selectedUser.email,
                          role: 'technician',
                          title: selectedUser.role,
                          avatar: selectedUser.avatar,
                          workspaceId: task.workspaceId
                        }
                      : undefined
                  });
                }}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none shadow-2xs font-medium cursor-pointer"
              >
                <option value="">Unassigned</option>
                {workspace.teams.flatMap((t) => t.members).map((m) => (
                  <option key={m.userId} value={m.userId}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-slate-500 mb-1 font-semibold">Lifecycle Status</div>
              <select
                value={task.status}
                onChange={(e) => onUpdateTask(task.id, { status: e.target.value as TaskStatus })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 focus:outline-none shadow-2xs font-medium cursor-pointer capitalize"
              >
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="awaiting_verification">Awaiting Verification</option>
                <option value="resolved">Resolved</option>
                <option value="reopened">Reopened</option>
              </select>
            </div>
          </div>

          {/* AI Safety Protocol & Checklist */}
          {task.aiAnalysis && (
            <div className="space-y-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AI Operational Diagnosis & Safety Checklist</span>
                </span>
                <span className="font-mono text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Confidence: {task.aiAnalysis.confidenceScore}%
                </span>
              </div>

              {task.aiAnalysis.safetyWarnings.length > 0 && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-red-700 text-[11px]">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>SAFETY HAZARD WARNING</span>
                  </div>
                  {task.aiAnalysis.safetyWarnings.map((w, idx) => (
                    <div key={idx} className="pl-4 text-[11px] leading-relaxed">
                      • {w}
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-700">Remediation Steps:</div>
                {task.aiAnalysis.suggestedSteps.map((s, idx) => (
                  <div key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Original Reported Evidence */}
          {(task.originalEvidenceUrl || task.voiceTranscription) && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-800">
                Original Incident Evidence
              </div>

              {task.originalEvidenceUrl && (
                <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                  <img
                    src={task.originalEvidenceUrl}
                    alt="Original incident"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {task.voiceTranscription && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="text-[11px] font-mono text-slate-500 font-semibold">
                    Spoken Field Dispatch Transcript:
                  </div>
                  <p className="italic">"{task.voiceTranscription}"</p>
                </div>
              )}
            </div>
          )}

          {/* Resolution Submission & Verification Status */}
          {task.resolutionSubmission ? (
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">Technician Resolution Submission</span>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">
                  Submitted {new Date(task.resolutionSubmission.submittedAt).toLocaleTimeString()} by{' '}
                  <strong className="text-slate-800">{task.resolutionSubmission.submittedBy.name}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold">Completion Notes: </span>
                    <span className="text-slate-800">{task.resolutionSubmission.completionNotes}</span>
                  </div>
                  {task.resolutionSubmission.partsUsed && (
                    <div>
                      <span className="text-slate-500 font-semibold">Parts Used: </span>
                      <span className="text-slate-800 font-mono text-[11px]">
                        {task.resolutionSubmission.partsUsed}
                      </span>
                    </div>
                  )}

                  {/* AI Comparison Assessment */}
                  {task.resolutionSubmission.aiComparison && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 mt-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900">AI Visual Delta Check</span>
                        <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Inspection Score: {task.resolutionSubmission.aiComparison.inspectionScore}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {task.resolutionSubmission.aiComparison.remarks}
                      </p>
                    </div>
                  )}
                </div>

                {task.resolutionSubmission.resolutionEvidenceUrl && (
                  <div className="h-44 rounded-xl overflow-hidden border border-slate-200 bg-white">
                    <img
                      src={task.resolutionSubmission.resolutionEvidenceUrl}
                      alt="Resolution verification"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Human Review Decision Display or Action Form */}
              {task.verificationReview ? (
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    task.verificationReview.decision === 'approved'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>
                      {task.verificationReview.decision === 'approved'
                        ? '✓ Verified & Signed Off by Operations Lead'
                        : '✕ Verification Rejected (Remediation Needed)'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-600">
                      {task.verificationReview.reviewedBy.name}
                    </span>
                  </div>
                  <p className="text-[11px]">{task.verificationReview.feedback}</p>
                </div>
              ) : (
                <div className="pt-2">
                  {!isReviewing ? (
                    <button
                      onClick={() => setIsReviewing(true)}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Review Resolution & Sign Off</span>
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                      <div className="text-xs font-bold text-slate-900">
                        Lead Reviewer Verification Decision
                      </div>
                      <textarea
                        rows={2}
                        value={verificationFeedback}
                        onChange={(e) => setVerificationFeedback(e.target.value)}
                        placeholder="Enter inspection feedback or notes before signing off..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none resize-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setIsReviewing(false)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={isSubmittingReview}
                          onClick={() => handleVerificationDecision('rejected')}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold cursor-pointer"
                        >
                          Reject & Reopen
                        </button>
                        <button
                          disabled={isSubmittingReview}
                          onClick={() => handleVerificationDecision('approved')}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-sm"
                        >
                          {isSubmittingReview ? 'Signing...' : 'Approve & Mark Resolved'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              {!isResolving ? (
                <button
                  onClick={() => setIsResolving(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                  <span>Submit Post-Repair Resolution Evidence</span>
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>Submit Resolution Evidence & Trigger Visual Verification</span>
                    <button
                      onClick={() => setIsResolving(false)}
                      className="text-slate-500 hover:text-slate-900 text-[11px] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Remediation Notes / Actions Performed
                    </label>
                    <textarea
                      rows={2}
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                      placeholder="Detail what parts were replaced, calibrations conducted, and safety tests run..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none resize-none shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Parts / Consumables Used
                      </label>
                      <input
                        type="text"
                        value={partsUsed}
                        onChange={(e) => setPartsUsed(e.target.value)}
                        placeholder="e.g. Thermocouple TS-884, O-ring seal"
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Upload After-Repair Photograph
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleResolutionPhotoUpload}
                        className="w-full text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isSubmittingResolution || !resolutionNotes.trim()}
                    onClick={handleResolveSubmit}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmittingResolution ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Running Visual Verification Check...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Submit for Verification</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Comments & Progress Notes Thread */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Progress Notes & Discussion ({task.comments.length})</span>
            </div>

            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {task.comments.length === 0 ? (
                <div className="text-xs text-slate-400 py-3 text-center italic">
                  No comments logged yet.
                </div>
              ) : (
                task.comments.map((comm) => (
                  <div
                    key={comm.id}
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      comm.isInternal
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <span>{comm.author.name}</span>
                        {comm.isInternal && (
                          <span className="text-[9px] uppercase font-mono text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-bold">
                            Internal Staff Note
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[10px]">
                        {new Date(comm.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-slate-700">{comm.content}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleCommentSubmit} className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a progress update or note..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={isSubmittingComment || !commentText.trim()}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInternalComment}
                  onChange={(e) => setIsInternalComment(e.target.checked)}
                  className="rounded bg-white border-slate-300 text-slate-900 focus:ring-0"
                />
                <span>Mark as Internal Staff Note</span>
              </label>
            </form>
          </div>

          {/* Activity Log Audit Timeline */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Activity className="w-4 h-4 text-slate-500" />
              <span>Full Audit Trail</span>
            </div>

            <div className="space-y-2 border-l-2 border-slate-200 pl-3">
              {task.activityLog.map((act) => (
                <div key={act.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between text-slate-500 text-[10px]">
                    <span className="text-slate-800 font-bold">{act.actor}</span>
                    <span className="font-mono">
                      {new Date(act.timestamp).toLocaleDateString()} {new Date(act.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-slate-900 font-semibold">{act.action}</div>
                  {act.details && <div className="text-[11px] text-slate-600">{act.details}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
