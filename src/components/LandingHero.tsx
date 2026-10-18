import React from 'react';
import {
  Camera,
  Mic,
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Clock,
  Layers,
  UtensilsCrossed,
  Building2,
  Workflow,
  SearchCheck,
  Check,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { WorkspaceId } from '../types';

interface LandingHeroProps {
  onStartReporting: () => void;
  onExploreDashboard: () => void;
  onSelectWorkspace: (ws: WorkspaceId) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartReporting,
  onExploreDashboard,
  onSelectWorkspace
}) => {
  return (
    <div className="bg-slate-50 text-slate-900 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Prop & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Operations & Facilities Intelligence</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Evidence-Based Verification</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
                Turn Operational Problems Into Verified Solutions.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Staff simply report what is broken using a photo, voice note, or text. OpsPilot AI instantly diagnoses the problem, flags hazards, assigns responsibility to the right team, and verifies the resolution with photo proof.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onStartReporting}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Report an Issue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onExploreDashboard}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>Explore Live Dashboard</span>
                </button>
              </div>

              {/* Sub-kpi metrics */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900">
                    3 Channels
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">Photo, Voice & Text</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-600">
                    100% Verified
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">Photo Proof & Human Sign-off</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-blue-600">
                    &lt; 2.5 Hrs
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">Average MTTR Turnaround</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
                <img
                  src="/src/assets/images/hero_operations_facility_1792307333019.jpg"
                  alt="OpsPilot AI Operations Control Center"
                  className="w-full h-84 object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-lg backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-mono font-bold text-slate-900">#RAN-2026-081</span>
                    <span className="text-amber-700 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[10px]">
                      Awaiting Sign-off
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    Commercial Deep Fryer Overheating & Thermocouple Sensor
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                    <span>Assigned: David Kim</span>
                    <span className="text-emerald-700 font-mono font-bold">AI Inspection: 94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step How It Works Section */}
      <section className="py-16 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              How OpsPilot AI Works
            </h2>
            <p className="text-sm text-slate-600">
              A frictionless 4-step workflow that turns frontline complaints into verified resolutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm mb-4">
                  01
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  1. Staff Spot & Report
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Anyone on the floor snaps a photo, records a voice memo, or enters a quick note. No complicated ticketing forms.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-blue-600 pt-2 border-t border-slate-100">
                Photo · Voice · Text
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center text-sm mb-4">
                  02
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  2. AI Triages & Assigns
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  OpsPilot AI diagnoses the failure, checks hazard safety protocols, and routes the ticket to the right specialized team.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-amber-600 pt-2 border-t border-slate-100">
                Automated Routing
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm mb-4">
                  03
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  3. Technician Remediates
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Technician follows the generated checklist, logs parts used, and uploads an after-repair proof photograph.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-indigo-600 pt-2 border-t border-slate-100">
                Photo Proof Mandatory
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-sm mb-4">
                  04
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  4. Verified & Signed Off
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  AI compares before and after evidence. A supervisor conducts physical review and grants official sign-off.
                </p>
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 pt-2 border-t border-slate-100">
                Verified Resolution
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Showcase */}
      <section className="py-16 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                The Verification Center
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Don’t Just Mark Done. Prove It With Visual Evidence.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Generic issue trackers close tickets when someone clicks a checkbox. OpsPilot AI requires proof: the technician uploads an after-repair photograph, AI performs visual comparison, and a supervisor signs off.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Side-by-side photographic inspection before and after remediation.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>AI checks for loose cables, uncleaned residues, or missing safety shields.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Immutable audit log with reviewer timestamp and official sign-off.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-md">
                <div className="text-xs font-bold text-slate-700 mb-4 flex items-center justify-between">
                  <span>Photographic Delta Inspection Protocol</span>
                  <span className="text-emerald-700 font-mono text-xs font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Score: 94 / 100
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-slate-600">1. Reported Issue</div>
                    <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-200">
                      <img
                        src="/src/assets/images/ranchers_kitchen_ops_1792307334149.jpg"
                        alt="Original Issue"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full shadow-xs">
                        Reported
                      </span>
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-slate-600">2. After-Repair Proof</div>
                    <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-200">
                      <img
                        src="/src/assets/images/verification_inspection_1792307335334.jpg"
                        alt="Resolution Evidence"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full shadow-xs">
                        Verified Fixed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SearchCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Thermocouple sensor replaced; display steady at 175°C calibration.</span>
                  </div>
                  <span className="font-semibold text-slate-800 hidden sm:inline">Signed off by Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Space Environments */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Tailored Spaces & Specialized Teams
            </h2>
            <p className="text-sm text-slate-600">
              Switch between hospitality operations and commercial campus environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ranchers */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                      <UtensilsCrossed className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Ranchers Food Service</h3>
                      <div className="text-xs text-slate-500">Commercial Kitchen & Food Safety Space</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectWorkspace('ranchers')}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer flex items-center gap-1"
                  >
                    <span>Enter Space</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-48 rounded-2xl overflow-hidden border border-slate-200 mb-4">
                  <img
                    src="/src/assets/images/ranchers_kitchen_ops_1792307334149.jpg"
                    alt="Ranchers Kitchen"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Fryer vats, walk-in cold chain sensors, chemical sanitizer lines, food quarantine compliance, and gas line safety.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Kitchen Line</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Cold Chain</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Food Safety QA</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Plumbing & Exhaust</span>
              </div>
            </div>

            {/* COLABS */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">COLABS Campus</h3>
                      <div className="text-xs text-slate-500">Coworking Space & Facilities</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectWorkspace('colabs')}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 cursor-pointer flex items-center gap-1"
                  >
                    <span>Enter Space</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-48 rounded-2xl overflow-hidden border border-slate-200 mb-4">
                  <img
                    src="/src/assets/images/colabs_workspace_tech_1792307334095.jpg"
                    alt="COLABS Campus"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Auditorium 4K laser projectors, floor power rails, HVAC chillers, access control turnstiles, and member community requests.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Space Engineering</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">AV & Tech Infra</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Community Experience</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Janitorial</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
