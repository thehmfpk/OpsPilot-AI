import React, { useState } from 'react';
import {
  ShieldAlert,
  Plus,
  Layers,
  CheckCircle2,
  Users,
  BarChart3,
  LayoutDashboard,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  Building2,
  UtensilsCrossed,
  UserCheck,
  LogIn
} from 'lucide-react';
import { WorkspaceId, User, AIProviderStatus } from '../types';

interface NavbarProps {
  activeTab: 'dashboard' | 'tasks' | 'verification' | 'teams' | 'analytics' | 'landing';
  setActiveTab: (tab: 'dashboard' | 'tasks' | 'verification' | 'teams' | 'analytics' | 'landing') => void;
  currentWorkspace: WorkspaceId;
  setCurrentWorkspace: (ws: WorkspaceId) => void;
  currentUser: User;
  allUsers: User[];
  onOpenAuthModal: () => void;
  onOpenReportModal: () => void;
  onOpenSettings: () => void;
  aiStatus: AIProviderStatus | null;
  awaitingVerificationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentWorkspace,
  setCurrentWorkspace,
  currentUser,
  allUsers,
  onOpenAuthModal,
  onOpenReportModal,
  onOpenSettings,
  aiStatus,
  awaitingVerificationCount
}) => {
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);

  interface NavItem {
    id: 'dashboard' | 'tasks' | 'verification' | 'teams' | 'analytics';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeCount?: number;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: Layers },
    {
      id: 'verification',
      label: 'Verification',
      icon: CheckCircle2,
      badgeCount: awaitingVerificationCount
    },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Wordmark & Brand Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm">
                OP
              </div>
              <div>
                <div className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <span>OpsPilot AI</span>
                  {aiStatus?.isDemoMode && (
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      Demo Mode
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block">
                  Spot it · Solve it · Verify it
                </div>
              </div>
            </button>

            {/* Workspace Selector */}
            <div className="relative ml-2 sm:ml-4 border-l border-slate-200 pl-3 sm:pl-4">
              <button
                onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              >
                {currentWorkspace === 'ranchers' ? (
                  <>
                    <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ranchers Food Service</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>COLABS Campus</span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {workspaceDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-fade-in">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Select Workspace
                  </div>
                  <button
                    onClick={() => {
                      setCurrentWorkspace('ranchers');
                      setWorkspaceDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                      currentWorkspace === 'ranchers'
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-semibold text-slate-900">Ranchers Food Service</div>
                        <div className="text-[10px] text-slate-500">Commercial Kitchen & Food Safety</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentWorkspace('colabs');
                      setWorkspaceDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between mt-1 cursor-pointer ${
                      currentWorkspace === 'colabs'
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-semibold text-slate-900">COLABS Campus</div>
                        <div className="text-[10px] text-slate-500">Coworking Space & Facilities</div>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badgeCount && item.badgeCount > 0 ? (
                    <span className="ml-1 text-[10px] font-mono bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded-full font-semibold">
                      {item.badgeCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Profile */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Report Issue CTA */}
            <button
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Report Issue</span>
            </button>

            {/* Settings button */}
            <button
              onClick={onOpenSettings}
              title="System Diagnostics & Settings"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Active User / Login Button */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 p-1 pl-2 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer text-left"
              title="Click to Switch Demo Persona or Login"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-300"
                referrerPolicy="no-referrer"
              />
              <div className="hidden lg:block text-left text-xs leading-tight">
                <div className="font-semibold text-slate-900 truncate max-w-[110px]">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500 truncate max-w-[110px] capitalize">
                  {currentUser.role}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-200 overflow-x-auto gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-1 rounded-full font-semibold">
                    {item.badgeCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
