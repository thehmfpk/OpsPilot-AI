# OpsPilot AI

> **Spot it. Solve it. Verify it.**

AI-powered operations management that converts photos, voice notes, and text into actionable solutions, assigned tasks, and verified resolutions using Gemini and Groq.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.x-white.svg)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-orange.svg)](https://ai.google.dev/)

---

## 1. Problem Statement

In operational environments—commercial kitchens, manufacturing floors, co-working campuses, and hospital facilities—staff frequently encounter operational problems (equipment malfunctions, food safety risks, structural hazards, acoustic resonance, or electrical faults). However, they often face significant friction:
- **Unclear Actionability:** Frontline personnel may not recognize whether an issue is a superficial fault or an acute hazard requiring immediate equipment shutdown.
- **Urgency Misclassification:** Critical issues get logged into generic ticketing queues without immediate escalation.
- **Routing Confusion:** Reports bounce between maintenance, IT, facilities, and external contractors.
- **Lack of Resolution Proof:** Traditional issue trackers close tickets when a technician clicks "Done"—with zero physical evidence that the remediation was actually completed correctly and safely.

## 2. The OpsPilot AI Solution

OpsPilot AI establishes a closed-loop operational workflow:
1. **Multimodal Incident Ingestion:** Report via camera photo, audio voice note, or structured text.
2. **AI Triage & Safety Screening:** Multimodal Gemini 3.8 Flash detects the failure component, assesses severity, outputs critical safety warnings, and generates a step-by-step remediation checklist.
3. **Automated Team Dispatch:** Assigns the issue to the appropriate team and technician with estimated effort and due dates.
4. **Resolution Submission:** The technician completes work, logs parts used, and uploads an after-repair verification photo.
5. **AI Visual Delta Inspection:** AI compares the original failure evidence against the resolution photo, checking for residual hazards, wire management, and component readiness.
6. **Mandatory Human Sign-off:** An authorized operations reviewer conducts final inspection, officially signing off or reopening with required rework notes.

---

## 3. Workspaces

OpsPilot AI provides multi-workspace isolation:

### Workspace A: Ranchers (Restaurant & Food Service)
- **Domain:** Culinary operations, commercial appliances, food safety, and HACCP cold-chain compliance.
- **Example Issues:** Fryer thermocouple runaway, walk-in freezer gasket tears, sanitizer chemical dosing air locks, slicer motor overheating.
- **Teams:** Kitchen Operations, Quality Assurance & Safety, Maintenance & Facility.

### Workspace B: COLABS (Coworking & Commercial Campus)
- **Domain:** Enterprise coworking facilities, IoT AV systems, climate control, and power infrastructure.
- **Example Issues:** Auditorium 4K laser projector HDMI matrix dropouts, rooftop chiller vibration damper fatigue, floor power busbar overloads, access control turnstiles.
- **Teams:** Facilities & Engineering, IT & AV Support, Community Operations.

---

## 4. Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                   OpsPilot AI Frontend                      │
│   React 19 SPA · Tailwind CSS v4 · Lucide · Plus Jakarta   │
│   Kanban / Table Views · MediaRecorder Audio · Modals       │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON REST API
┌──────────────────────────────▼──────────────────────────────┐
│                   Express.js Full-Stack Server              │
│   Vite Middlewares · REST Endpoints · Session Persona Auth  │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐
│  AI Engine (Server-Only)    │ │   Storage Engine (JSON/DB)  │
│  @google/genai SDK          │ │   data/opspilot-db.json     │
│  - gemini-3.8-flash (Vision)│ │   Workspaces, Tasks, Audit  │
│  - gemini-3.5-transcribe    │ │   Comments, Sign-off Logs   │
│  - Groq Llama 3.3 Fallback  │ └─────────────────────────────┘
└─────────────────────────────┘
```

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Plus Jakarta Sans, JetBrains Mono (tabular figures).
- **Backend:** Node.js, Express 4.x, TypeScript (`tsx`).
- **AI Integrations:** `@google/genai` (Gemini 3.8 Flash, Gemini 3.5 Transcribe) + Groq API fallback.
- **Persistence:** High-reliability server-side JSON storage engine with automatic backup and database seeding (`data/opspilot-db.json`).

---

## 5. Repository Structure

```
opspilot-ai/
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusions
├── data/                     # Persistent local database store
│   └── opspilot-db.json      # JSON persistence with demo seeds
├── index.html                # HTML entry point with metadata & fonts
├── metadata.json             # AI Studio metadata
├── package.json              # Dependencies and scripts
├── server.ts                 # Full-stack Express server
├── src/
│   ├── App.tsx               # Primary app controller and router
│   ├── index.css             # Tailwind CSS & typography setup
│   ├── main.tsx              # React DOM render entry
│   ├── assets/
│   │   └── images/           # Generated high-resolution domain assets
│   ├── components/
│   │   ├── Navbar.tsx        # 3-Zone top bar contract & persona switch
│   │   ├── LandingHero.tsx   # Public marketing & feature overview
│   │   ├── DashboardView.tsx # Database-backed KPI metrics & activity
│   │   ├── TaskList.tsx      # Table and Kanban board task views
│   │   ├── TaskDetailModal.tsx # Full ticket inspection & comment logs
│   │   ├── IssueReportWizard.tsx # 3-method report wizard with vision
│   │   ├── VerificationCenter.tsx # Side-by-side verification & sign-off
│   │   ├── TeamsView.tsx     # Team roster & workload directory
│   │   ├── AnalyticsView.tsx # MTTR, pass rate, & category charts
│   │   └── SettingsModal.tsx # AI diagnostics & demo reset
│   ├── server/
│   │   ├── aiService.ts      # Gemini & Groq backend integration
│   │   └── storage.ts        # Database queries, updates & activity logs
│   ├── types/
│   │   └── index.ts          # TypeScript domain interfaces
│   └── utils/
│       └── sampleData.ts     # Seed data for Ranchers and COLABS
└── tsconfig.json             # TypeScript configuration
```

---

## 6. Setup & Installation

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/opspilot-ai.git
cd opspilot-ai
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Add your API credentials:
```env
GEMINI_API_KEY="your-gemini-api-key"
# Optional Groq fallback
GROQ_API_KEY="your-groq-api-key"
GROQ_MODEL="llama-3.3-70b-versatile"
PORT=3000
```
> **Security Note:** All Gemini and Groq API calls execute exclusively on the server. The client never imports `@google/genai` and API keys are never exposed in browser bundles.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 7. Demo Mode

OpsPilot AI is pre-configured with fully populated demonstration datasets for both **Ranchers** and **COLABS**:
- In demo mode (when no `GEMINI_API_KEY` is provided), the application transparently operates with deterministic analysis and clearly tags responses with a `Demo Mode` indicator.
- Switch personas directly via the top right profile menu:
  - **Elena Rostova** (Operations Director / Reviewer)
  - **David Kim** (Culinary Equipment Specialist / Technician)
  - **Chef Tariq Al-Mansoor** (Head Kitchen Supervisor / Reporter)
  - **Marcus Vance** (Senior Facilities Technician)
  - **Sarah Chen** (Facilities & QA Lead)
- To reset sample data at any time, open **Settings > Reset Database to Seed State**.

---

## 8. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/ai/status` | AI provider connectivity and active model info |
| `GET` | `/api/workspaces` | Get all configured workspaces |
| `GET` | `/api/auth/current` | Active session persona |
| `POST` | `/api/auth/switch-user` | Switch demo persona (`{ userId }`) |
| `GET` | `/api/tasks` | Get tasks with filters (`status`, `category`, `priority`, `team`, `search`) |
| `POST` | `/api/tasks` | Create new operational task |
| `PATCH` | `/api/tasks/:id` | Update status, assignee, priority |
| `POST` | `/api/tasks/:id/comments` | Add progress note or internal staff note |
| `POST` | `/api/tasks/:id/resolve` | Submit after-repair resolution evidence & trigger AI delta check |
| `POST` | `/api/tasks/:id/verify` | Human review decision (`approved` / `rejected`) |
| `POST` | `/api/ai/analyze-issue` | Multimodal Gemini Vision issue analysis |
| `POST` | `/api/ai/compare-resolution` | AI before-and-after photo delta inspection |
| `POST` | `/api/ai/transcribe-voice` | Speech-to-text voice dispatch transcription |
| `GET` | `/api/dashboard/stats` | Real database-backed KPI statistics |
| `POST` | `/api/reset-demo-data` | Restore initial database seed records |

---

## 9. Verification & Safety Philosophy

OpsPilot AI enforces a strict safety protocol:
- **AI Is Assistive, Not Authoritative:** Model recommendations provide diagnostic suggestions, checklists, and visual change detection. They are never treated as legal proof of repair or safety compliance.
- **Mandatory Human Sign-off:** Dangerous equipment (high voltage, high-pressure refrigeration, gas lines, open cooking vats) requires verified human inspection before tickets can reach `Resolved`.

---

## 10. Git Commands to Push to GitHub

To publish this project to your GitHub repository `opspilot-ai`:

```bash
# 1. Initialize git if not already present
git init

# 2. Add remote repository
git remote add origin https://github.com/<your-username>/opspilot-ai.git

# 3. Stage all files
git add .

# 4. Commit with descriptive message
git commit -m "feat: complete OpsPilot AI full-stack application with Gemini vision and verification center"

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

---

## 11. GitHub Repository Metadata

- **Repository Name:** `opspilot-ai`
- **Description:** AI-powered operations management that converts photos, voice notes, and text into actionable solutions, assigned tasks, and verified resolutions using Gemini and Groq.
- **Topics:** `ai`, `artificial-intelligence`, `gemini`, `groq`, `operations-management`, `issue-tracking`, `task-management`, `react`, `typescript`, `full-stack`, `automation`, `computer-vision`, `voice-ai`
