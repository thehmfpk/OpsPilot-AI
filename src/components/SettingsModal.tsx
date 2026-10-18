import React, { useState } from 'react';
import {
  X,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Cpu,
  GitBranch,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AIProviderStatus, Workspace } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiStatus: AIProviderStatus | null;
  workspace: Workspace;
  onResetData: () => Promise<void>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  aiStatus,
  workspace,
  onResetData
}) => {
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReset = async () => {
    setIsResetting(true);
    setResetMessage(null);
    try {
      await onResetData();
      setResetMessage('Database restored to initial seed state.');
      setTimeout(() => setResetMessage(null), 3000);
    } catch (err: any) {
      setResetMessage('Reset failed: ' + err.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
            <span className="text-sm font-bold text-slate-900">System Settings & Data Controls</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs">
          {/* AI Intelligence Engine Card */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-500" />
              <span>Operations AI Engine Status</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">OpsPilot Visual & Operations AI</span>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Operational
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Powers real-time photographic damage diagnosis, multimodal delta inspection, speech transcription, and automated team triage.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                Enterprise Security Architecture: All AI execution and keys remain securely on the server environment. The client receives only typed operational decisions.
              </span>
            </div>
          </div>

          {/* Reset Seed Data */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Sample Data Management
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Restore the database to the clean initial demo seed with sample issues for Ranchers Food Service and COLABS Campus (including awaiting verification tasks).
            </p>

            {resetMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{resetMessage}</span>
              </div>
            )}

            <button
              onClick={handleReset}
              disabled={isResetting}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              <span>{isResetting ? 'Restoring Database...' : 'Reset Database to Seed State'}</span>
            </button>
          </div>

          {/* Repository & System Identity */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
            <div className="flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Repository: <code className="font-mono text-slate-800 font-bold">opspilot-ai</code></span>
            </div>
            <span className="font-medium">OpsPilot AI v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
