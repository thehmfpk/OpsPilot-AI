import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Camera,
  Mic,
  FileText,
  Sparkles,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Trash2,
  Square,
  Building2,
  UtensilsCrossed,
  Check,
  Zap,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { Workspace, User, AIAnalysisResult, Priority, Task } from '../types';
import { SAMPLE_REPORT_PRESETS } from '../utils/sampleData';

interface IssueReportWizardProps {
  isOpen: boolean;
  onClose: () => void;
  currentWorkspace: Workspace;
  currentUser: User;
  onTaskCreated: (task: Task) => void;
}

export const IssueReportWizard: React.FC<IssueReportWizardProps> = ({
  isOpen,
  onClose,
  currentWorkspace,
  currentUser,
  onTaskCreated
}) => {
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
  const [reportingMethod, setReportingMethod] = useState<'photo' | 'voice' | 'text'>('photo');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(currentWorkspace.locations[0] || 'General Area');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  // Completed Task State
  const [createdTask, setCreatedTask] = useState<Task | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize defaults on workspace change
  useEffect(() => {
    if (currentWorkspace.locations.length > 0) {
      setLocation(currentWorkspace.locations[0]);
    }
  }, [currentWorkspace]);

  if (!isOpen) return null;

  // Handle Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        setErrorMessage('File size exceeds 20MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoDataUrl(reader.result as string);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Selection for fast 1-click demo
  const applyPreset = (preset: typeof SAMPLE_REPORT_PRESETS[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setLocation(preset.location);
    setPhotoDataUrl(preset.imageUrl);
  };

  // Start Audio Recording
  const startRecording = async () => {
    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(url);

        const reader = new FileReader();
        reader.onloadend = async () => {
          const b64 = reader.result as string;
          setAudioBase64(b64);

          // Transcribe automatically
          setIsTranscribing(true);
          try {
            const res = await fetch('/api/ai/transcribe-voice', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: b64, mimeType: 'audio/webm' })
            });
            const data = await res.json();
            if (data.transcript) {
              setDescription((prev) => (prev ? `${prev}\n${data.transcript}` : data.transcript));
              if (!title) {
                setTitle(data.transcript.slice(0, 50) + '...');
              }
            }
          } catch (err) {
            console.error('Transcription error:', err);
          } finally {
            setIsTranscribing(false);
          }
        };
        reader.readAsDataURL(audioBlob);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((sec) => sec + 1);
      }, 1000);
    } catch (err: any) {
      setErrorMessage('Microphone access denied or unsupported in this browser.');
    }
  };

  // Stop Audio Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  // Submit Complaint & Trigger Automated AI Triage + Assignment
  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !photoDataUrl && !title.trim()) {
      setErrorMessage('Please describe the issue or attach a photo.');
      return;
    }

    setErrorMessage(null);
    setStep('processing');

    try {
      // 1. Run AI Analysis in backend
      const analysisRes = await fetch('/api/ai/analyze-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim() || undefined,
          description: description.trim() || title.trim() || 'Observed equipment or facility issue in photo.',
          workspaceId: currentWorkspace.id,
          location,
          category: urgency === 'urgent' ? 'Safety Hazard' : 'Operations',
          imageBase64: photoDataUrl || undefined,
          voiceText: reportingMethod === 'voice' ? description : undefined
        })
      });

      let aiAnalysis: AIAnalysisResult | undefined;
      if (analysisRes.ok) {
        aiAnalysis = await analysisRes.json();
      }

      // Determine priority and assigned team automatically
      const assignedPriority: Priority = urgency === 'urgent' ? 'critical' : (aiAnalysis?.recommendedPriority || 'medium');
      const assignedTeam = aiAnalysis?.recommendedTeam || currentWorkspace.teams[0]?.name || 'Operations';

      // 2. Create Task & Auto-Dispatch
      const taskPayload = {
        title: title.trim() || aiAnalysis?.issueSummary || 'Operational Issue',
        description: description.trim() || title.trim(),
        workspaceId: currentWorkspace.id,
        location,
        category: aiAnalysis?.suggestedCategory || 'General Operations',
        priority: assignedPriority,
        reportingMethod,
        originalEvidenceUrl: photoDataUrl || undefined,
        voiceTranscription: reportingMethod === 'voice' ? description : undefined,
        voiceAudioUrl: audioBlobUrl || undefined,
        aiAnalysis,
        assignedTeam,
        status: 'assigned',
        dueHours: assignedPriority === 'critical' ? 4 : assignedPriority === 'high' ? 8 : 24
      };

      const taskRes = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskPayload)
      });

      if (!taskRes.ok) {
        throw new Error('Failed to create operational task');
      }

      const newTask: Task = await taskRes.json();
      setCreatedTask(newTask);
      onTaskCreated(newTask);
      setStep('success');
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'Error submitting complaint');
      setStep('input');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Wizard Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">
                {step === 'success' ? 'Complaint Registered' : 'Report an Issue / Complaint'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {currentWorkspace.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {step === 'success'
                ? 'Your issue has been logged and automatically assigned to the right team'
                : 'Simply describe what is wrong. Our AI handles classification and team assignment.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Input Complaint */}
          {step === 'input' && (
            <form onSubmit={handleSubmitComplaint} className="space-y-5">
              {/* Method Switcher */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  1. How would you like to report?
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setReportingMethod('photo')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      reportingMethod === 'photo'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span>Photo / Vision</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportingMethod('voice')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      reportingMethod === 'voice'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Mic className="w-4 h-4 text-amber-600" />
                    <span>Voice Note</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportingMethod('text')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      reportingMethod === 'text'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Quick Text</span>
                  </button>
                </div>
              </div>

              {/* Photo Mode */}
              {reportingMethod === 'photo' && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-700">
                    Snap or Upload Evidence Photo
                  </label>
                  {photoDataUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-52 flex items-center justify-center">
                      <img
                        src={photoDataUrl}
                        alt="Issue Evidence"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotoDataUrl(null)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 text-slate-700 hover:text-red-600 shadow-sm border border-slate-200 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-slate-50"
                    >
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <div className="text-xs font-bold text-slate-800">
                        Click or drag a photo here to attach
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        JPG, PNG, WebP · Visual analysis will identify the failure automatically
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                  )}

                  {/* 1-Click Demo Presets */}
                  <div className="pt-1">
                    <div className="text-[11px] font-semibold text-slate-500 mb-2">
                      Or select a sample incident for {currentWorkspace.name}:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SAMPLE_REPORT_PRESETS.filter((p) => p.workspaceId === currentWorkspace.id).map(
                        (preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-left text-xs transition-colors flex items-center gap-2.5 shadow-2xs cursor-pointer"
                          >
                            <img
                              src={preset.imageUrl}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-100"
                              referrerPolicy="no-referrer"
                            />
                            <div className="truncate">
                              <div className="font-semibold text-slate-900 truncate">{preset.title}</div>
                              <div className="text-[10px] text-slate-500 truncate">{preset.location}</div>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Voice Mode */}
              {reportingMethod === 'voice' && (
                <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 text-center space-y-4">
                  <div className="text-xs font-bold text-slate-800">
                    Spoken Voice Dispatch
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Speak naturally about what is broken or not working. Voice AI will transcribe your complaint automatically.
                  </p>

                  <div className="flex items-center justify-center gap-3 py-2">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <Mic className="w-4 h-4" />
                        <span>Start Recording</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer animate-pulse"
                      >
                        <Square className="w-4 h-4 fill-white" />
                        <span>Stop Recording ({recordingSeconds}s)</span>
                      </button>
                    )}
                  </div>

                  {isTranscribing && (
                    <div className="flex items-center justify-center gap-2 text-xs text-amber-700 font-mono font-medium">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                      <span>Transcribing spoken voice dispatch...</span>
                    </div>
                  )}

                  {audioBlobUrl && (
                    <div className="pt-2 flex items-center justify-center">
                      <audio src={audioBlobUrl} controls className="h-8 max-w-xs" />
                    </div>
                  )}
                </div>
              )}

              {/* Core Details */}
              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    What happened? (Short Summary)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Deep fryer oil smoking, or projector screen glitching..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>Where is it located?</span>
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 shadow-2xs cursor-pointer"
                    >
                      {currentWorkspace.locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setUrgency('normal')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                          urgency === 'normal'
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Needs Attention
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('urgent')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                          urgency === 'urgent'
                            ? 'bg-red-600 text-white border-red-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        Urgent / Hazard
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Additional Details / Notes
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe symptoms, strange sounds, leaks, or smells so the technician brings the right tools..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs resize-none"
                  />
                </div>
              </div>

              {/* Form Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Submit Complaint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Processing Animation */}
          {step === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 mx-auto flex items-center justify-center animate-pulse shadow-sm">
                <Sparkles className="w-7 h-7 text-amber-500 animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Registering & Auto-Routing Complaint
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  OpsPilot AI is analyzing symptoms, evaluating safety protocols, and dispatching the task to the responsible department...
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Success Confirmation Card */}
          {step === 'success' && createdTask && (
            <div className="py-4 space-y-5 animate-fade-in">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-950">
                    Complaint Logged Successfully!
                  </div>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Your complaint has been automatically assigned to the{' '}
                    <strong>{createdTask.assignedTeam}</strong> department.
                  </p>
                </div>
              </div>

              {/* Ticket Summary Card */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {createdTask.ticketNumber}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 capitalize">
                    Priority: {createdTask.priority}
                  </span>
                </div>

                <div className="text-xs space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm">{createdTask.title}</div>
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{createdTask.location}</span>
                  </div>
                  {createdTask.aiAnalysis && (
                    <div className="pt-2 text-[11px] text-slate-700 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-semibold text-slate-900">Diagnosis & Action Protocol:</div>
                      <p>{createdTask.aiAnalysis.issueSummary}</p>
                      {createdTask.aiAnalysis.safetyWarnings.length > 0 && (
                        <div className="text-red-600 font-medium pt-1">
                          ⚠️ {createdTask.aiAnalysis.safetyWarnings[0]}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm text-center"
                >
                  Done · Return to Space
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
