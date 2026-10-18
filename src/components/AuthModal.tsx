import React, { useState } from 'react';
import { X, UserCheck, Shield, Wrench, FileEdit, Check, ArrowRight, Building2, UtensilsCrossed } from 'lucide-react';
import { User, WorkspaceId } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  allUsers: User[];
  onSelectUser: (userId: string) => void;
  currentWorkspace: WorkspaceId;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allUsers,
  onSelectUser,
  currentWorkspace
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'custom'>('demo');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customRole, setCustomRole] = useState<'reporter' | 'technician' | 'reviewer'>('reporter');

  if (!isOpen) return null;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'reviewer':
        return <Shield className="w-4 h-4 text-emerald-600" />;
      case 'technician':
        return <Wrench className="w-4 h-4 text-blue-600" />;
      default:
        return <FileEdit className="w-4 h-4 text-amber-600" />;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'reviewer':
        return 'Operations Lead — inspects after-repair evidence and signs off resolutions.';
      case 'technician':
        return 'Specialist / Assignee — performs physical fixes and uploads proof.';
      default:
        return 'Frontline Staff / Reporter — spots issues and logs complaints effortlessly.';
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    // Switch to first matching or created
    const found = allUsers.find((u) => u.role === customRole && u.workspaceId === currentWorkspace) || allUsers[0];
    onSelectUser(found.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-slate-700" />
              <span>Sign In / Demo Persona</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an operational role to test reporting, repairs, or verification
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'demo'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            1-Click Demo Accounts
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'custom'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Custom Sign In
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'demo' ? (
            <div className="space-y-2.5">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Available Roles for {currentWorkspace === 'ranchers' ? 'Ranchers Food Service' : 'COLABS Campus'}:
              </div>

              {allUsers.map((user) => {
                const isSelected = currentUser.id === user.id;
                const isCurrentWs = user.workspaceId === currentWorkspace;

                return (
                  <button
                    key={user.id}
                    onClick={() => {
                      onSelectUser(user.id);
                      onClose();
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900/5 shadow-sm ring-1 ring-slate-900/10'
                        : isCurrentWs
                        ? 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        : 'border-slate-100 bg-slate-50/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 text-xs truncate flex items-center gap-1.5">
                          <span>{user.name}</span>
                          {isSelected && (
                            <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.2 rounded font-medium">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] uppercase font-mono text-slate-400 capitalize flex items-center gap-1">
                          {getRoleIcon(user.role)}
                          <span>{user.role}</span>
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 font-medium truncate mt-0.5">
                        {user.title}
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {getRoleDescription(user.role)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="jordan.miller@company.internal"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Operational Role
                </label>
                <select
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 shadow-sm"
                >
                  <option value="reporter">Frontline Staff / Reporter (Logs Issues)</option>
                  <option value="technician">Technician / Specialist (Resolves Tasks)</option>
                  <option value="reviewer">Operations Lead (Signs Off & Verifies)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Continue into OpsPilot AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
