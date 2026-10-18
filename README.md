# OpsPilot AI
### From Operational Problems to Verified Solutions.

**Spot it. Solve it. Verify it.**

OpsPilot AI is an AI-powered operations management platform that transforms real-world operational issues into actionable solutions, trackable tasks, and evidence-based resolution workflows. By combining multimodal AI, intelligent task routing, and human-reviewed verification, OpsPilot AI helps teams move beyond simply reporting problems to managing them through resolution.

Built with **React, TypeScript, Node.js, Express, Google Gemini, and Groq**, OpsPilot AI demonstrates how AI can support frontline operations through a practical, end-to-end workflow.

## Project Demo

**See OpsPilot AI in action!**

Watch the demo to explore AI-powered issue reporting, intelligent task assignment, progress tracking, and evidence-based resolution verification.

**[Watch the Full Demo Video](https://drive.google.com/file/d/1Oodf1vtU9dYHtraOGWAj8Z72z5DD0ALR/view?usp=sharing)**

<p align="center">
  <strong>Report → Analyze → Assign → Resolve → Verify</strong>
</p>

<!-- Replace the image path below with your actual screenshot. -->
<p align="center">
  <img src="/img/1.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/2.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/3.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/4.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/5.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/6.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/6(2).png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/7.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/8.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/9.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/10.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/11.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/12.png" alt="OpsPilot AI operational dashboard" width="100%">
  <img src="/img/13.png" alt="OpsPilot AI operational dashboard" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Gemini%20%7C%20Groq-4285F4?style=for-the-badge" alt="Gemini and Groq">
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-3178C6?style=for-the-badge" alt="React and TypeScript">
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge" alt="Node.js and Express">
  <img src="https://img.shields.io/badge/Workflow-Evidence--Based%20Verification-111827?style=for-the-badge" alt="Evidence-based verification">
</p>

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [What Makes OpsPilot AI Different](#what-makes-opspilot-ai-different)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Real-World Use Cases](#real-world-use-cases)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Demo Mode](#demo-mode)
- [API Overview](#api-overview)
- [Safety, Trust and Verification](#safety-trust-and-verification)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Security](#security)

---

## Overview

Operational issues rarely end with someone reporting them. A broken appliance, a malfunctioning projector, a damaged workstation, or a potential safety hazard requires more than a ticket in a queue.

Someone must understand the problem, determine its urgency, identify the right team, coordinate the work, and confirm that the issue has actually been addressed.

OpsPilot AI is designed to connect these steps in one intelligent workflow.

Instead of treating issue reporting, task management, and resolution verification as disconnected activities, OpsPilot AI brings them together into a unified operational system.

**Our core idea:** AI should not merely describe a problem. It should help people take the next appropriate action and make the outcome easier to review.

## The Problem

### 1. Reporting without actionable guidance

Frontline employees may recognize that something is wrong without knowing the likely cause, the safest next step, or which team should handle it.

### 2. Urgency without effective prioritization

A minor maintenance request and a potentially dangerous equipment fault should not receive identical treatment. Poor prioritization can delay important interventions.

### 3. Fragmented ownership

Issues may move between maintenance, IT, facilities, inventory, and management teams without clear responsibility or visibility into progress.

### 4. Limited resolution transparency

Traditional workflows can treat a status update such as "Completed" as sufficient, even when there is no supporting evidence or independent review.

### 5. Repeated manual coordination

Staff spend time writing reports, forwarding requests, identifying responsible teams, requesting updates, and chasing confirmation.

These challenges create an opportunity for an AI-assisted operational workflow that connects issue understanding with accountability and verification.

## Our Solution

OpsPilot AI combines multimodal reporting, AI-assisted triage, structured task management, and evidence-based review.

### The complete workflow

| Stage | What happens |
|---|---|
| **Report** | A staff member submits a photo, voice note, or text description. |
| **Analyze** | AI interprets supported inputs and suggests the issue type, priority, and next steps. |
| **Assign** | The report becomes a structured task for the appropriate team or responsible person. |
| **Resolve** | The assigned team records progress, actions taken, and supporting evidence. |
| **Verify** | AI can assist with before-and-after evidence comparison when supported. |
| **Approve** | An authorized human reviewer approves the outcome or requests further work. |

The result is a closed-loop process designed to improve visibility, reduce coordination friction, and keep responsibility attached to each reported issue.

## What Makes OpsPilot AI Different?

### From issue logging to issue resolution

Many tools focus primarily on recording tickets and updating their status. OpsPilot AI is designed around the complete lifecycle, from the initial report to the final review.

### Multimodal input

Employees can report problems using the input methods supported by the application, including text, images, and voice.

### Context-aware operational recommendations

AI-generated summaries, categories, priority suggestions, and recommended actions help turn unstructured reports into information that teams can review and act upon.

### Evidence-based closure

The workflow distinguishes between submitting a completion update and obtaining an authorized resolution decision. Supporting evidence and review history make the outcome more transparent.

### Human-in-the-loop AI

AI supports analysis and decision-making without replacing the judgment of qualified staff. Human reviewers remain responsible for final approval where required.

### Adaptable across operational environments

The same underlying workflow can support restaurants, coworking spaces, facilities teams, and other environments with recurring operational issues.

---

## Key Features

### AI-Assisted Issue Reporting

- Text-based issue descriptions.
- Image-based reporting where supported.
- Voice recording and transcription where configured.
- Structured report review before task creation.
- Attachment handling and input validation.

### Intelligent Issue Triage

- Issue summarization.
- Suggested categories and priorities.
- Recommended teams and next actions.
- Potential safety concern identification.
- Clear handling of uncertainty and failed AI requests.

AI outputs are recommendations and must be validated before they drive important operational decisions.

### Task and Team Management

- Structured operational tasks.
- Assignment and reassignment.
- Priority and status tracking.
- Progress notes and comments.
- Activity history.
- Search, filtering, and workload visibility.

### Resolution Verification Center

- Original and final evidence review.
- AI-assisted visual comparison where supported.
- Resolution notes.
- Human approval or rejection.
- Rework requests and reopening.
- Verification decision history.

### Operational Dashboard

- Issue and task overview.
- Open and in-progress work.
- High-priority issues.
- Items awaiting verification.
- Recent operational activity.
- Team workload and reporting insights.

Dashboard metrics should reflect the application's persisted data rather than fixed demonstration figures.

### Multi-Workspace Operations

- Workspace-specific operational contexts.
- Configurable teams and issue categories.
- Separate issue tracking and workflows.
- Workspace-aware access controls where implemented.

### Gemini and Groq Integration

- Google Gemini for supported multimodal analysis and AI tasks.
- Groq for compatible text reasoning, classification, or other supported operations.
- Server-side API integration.
- Configurable models and provider failure handling.

Actual model capabilities depend on the model identifiers, provider APIs, and application configuration.

---

## How It Works

### Step 1 — Report the problem

An employee reports an issue using available text, image, or voice input.

Example: A restaurant employee notices that a refrigerator is not maintaining the expected temperature.

### Step 2 — Analyze the situation

The application sends supported report information to the configured AI provider. AI can summarize the issue, suggest a category and priority, and recommend escalation or appropriate next steps.

### Step 3 — Review and assign

The reporter reviews the AI suggestions. The issue is converted into a structured task and routed to the appropriate team according to the application's workflow.

### Step 4 — Track the work

The responsible team updates the task, adds progress notes, and records the work performed.

### Step 5 — Submit resolution evidence

The assignee provides resolution notes and supporting evidence, such as a final photograph where appropriate.

### Step 6 — Review the outcome

AI may assist in identifying visible differences between original and final images. An authorized reviewer then assesses the available evidence and approves the resolution or requests further work.

**Important:** A visual comparison cannot independently prove that equipment is safe, a repair is technically correct, or a food-safety requirement has been met. Appropriate physical inspections and qualified personnel remain essential.

---

## Real-World Use Cases

### Ranchers — Restaurant and Food-Service Operations

OpsPilot AI can be configured to support operational workflows involving:

- Kitchen equipment faults.
- Refrigerator and freezer concerns.
- Damaged food packaging.
- Inventory shortages.
- Maintenance requests.
- Cleaning and hygiene issues.
- Equipment service and follow-up.

Potential teams include Kitchen Operations, Maintenance, Inventory, Quality Assurance, and Restaurant Management.

For food-safety risks or potentially hazardous equipment, the workflow should prioritize escalation to qualified staff and appropriate protective measures rather than suggesting unsafe do-it-yourself repairs.

### COLABS — Coworking and Commercial Facilities

OpsPilot AI can be configured for:

- Meeting-room equipment problems.
- Projector and audiovisual issues.
- Damaged furniture.
- Connectivity incidents.
- Air-conditioning and facilities maintenance.
- Cleaning requests.
- Shared-space operational concerns.

Potential teams include Facilities, IT and AV Support, Housekeeping, Community Operations, and Workspace Management.

These examples illustrate intended application scenarios; they should not be interpreted as confirmed deployments or endorsements by the named organizations.

---

## Technology Stack

The following describes the technology stack specified for the project. Confirm the exact installed versions against the repository's package files.

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 | Component-based user interface |
| Language | TypeScript | Typed application development |
| Build tooling | Vite | Development server and frontend build |
| Styling | Tailwind CSS v4 | Responsive styling and design system |
| Icons | Lucide React | Consistent interface iconography |
| Backend | Node.js | Server-side JavaScript runtime |
| API framework | Express 4.x | REST API and application server |
| AI integration | Google Gemini | Supported AI and multimodal analysis |
| AI integration | Groq | Compatible AI inference tasks |
| Data validation | Project-configured validation libraries | Request and input validation |
| Persistence | JSON storage or configured database | Operational records and activity data |

### Why this stack?

- **React and TypeScript** support reusable UI components and maintainable application logic.
- **Vite** offers a streamlined frontend development workflow.
- **Express** provides a straightforward way to implement application APIs and server-side AI integrations.
- **Gemini** can support multimodal analysis when the selected model accepts the required input.
- **Groq** provides an additional inference option for compatible models and tasks.
- **Persistent storage** enables task history and operational state to survive application requests and restarts when properly configured.

The application architecture should keep AI credentials and provider requests on the server rather than exposing secrets in browser code.

## System Architecture

```text
┌──────────────────────────────────────────────────┐
│                  OpsPilot AI UI                  │
│                                                  │
│  Issue Reporting · Dashboard · Task Management   │
│  Teams · Analytics · Resolution Verification     │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│              Express Application Server          │
│                                                  │
│  REST API · Validation · Workflow Rules          │
│  Authentication · Authorization · Audit Events  │
└───────────────┬──────────────────┬───────────────┘
                │                  │
                ▼                  ▼
┌────────────────────────┐  ┌──────────────────────┐
│       AI Services      │  │    Storage Layer     │
│                        │  │                      │
│  Google Gemini         │  │  Tasks and Issues    │
│  Groq                  │  │  Comments and Events │
│  Supported AI Tasks    │  │  Evidence and Review │
└────────────────────────┘  └──────────────────────┘
```

The storage implementation may use the project's JSON persistence layer or a configured database. The diagram represents the logical architecture; actual implementation details should be confirmed in the source code.

---

## Project Structure

The repository is organized around a frontend, server-side APIs, AI services, and data management.

```text
opspilot-ai/
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── index.html
├── server.ts
├── data/
│   └── opspilot-db.json
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── assets/
    ├── components/
    │   ├── Navbar.tsx
    │   ├── LandingHero.tsx
    │   ├── DashboardView.tsx
    │   ├── TaskList.tsx
    │   ├── TaskDetailModal.tsx
    │   ├── IssueReportWizard.tsx
    │   ├── VerificationCenter.tsx
    │   ├── TeamsView.tsx
    │   ├── AnalyticsView.tsx
    │   └── SettingsModal.tsx
    ├── server/
    │   ├── aiService.ts
    │   └── storage.ts
    ├── types/
    │   └── index.ts
    └── utils/
        └── sampleData.ts
```

*Note: This is a representative structure based on the project layout. Keep the actual file and directory names consistent with your downloaded repository.*

---

## Getting Started

### Prerequisites

- Node.js version supported by the project.
- npm or the package manager matching the lockfile.
- Git.
- API credentials for the AI providers you want to use.
- A configured database if required by your implementation.

### 1. Clone the repository

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/opspilot-ai.git
cd opspilot-ai
```

### 2. Install dependencies

For an npm-based project:

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file from `.env.example`, then enter your own credentials.

```bash
cp .env.example .env
```

On Windows PowerShell, you can instead use:

```powershell
Copy-Item .env.example .env
```

Use the actual environment-variable names expected by your server code.

### 4. Start the development server

```bash
npm run dev
```

If the application uses a different port, open the address printed by the terminal.

### 5. Build the application

```bash
npm run build
```

If a production start script is configured, run:

```bash
npm start
```

Refer to `package.json` and the application setup instructions for the exact commands supported by your repository.

---

## Environment Configuration

Example variables for a server-side Gemini and Groq integration may include:

```env
GEMINI_API_KEY=
GROQ_API_KEY=
GROQ_MODEL=
PORT=3000
```

Include any additional variables your implementation requires, such as database settings or session secrets.

### Security requirements

- Never commit the real `.env` file.
- Never expose API keys in frontend source files.
- Keep `.env.example` limited to blank placeholders.
- Validate required configuration when the server starts.
- Handle provider errors without returning sensitive information to users.
- Review uploaded files and logs before publishing the repository.

---

## Demo Mode

A demonstration environment can help reviewers explore the product without configuring live AI credentials.

Where supported, demo mode should:

- Clearly label simulated AI output.
- Provide sample operational tasks.
- Let reviewers explore issue reporting and task-management screens.
- Distinguish demonstration data from real operational records.
- Avoid claiming that a live AI request occurred when it did not.

Demo personas and seeded data should be treated as fictional examples, not real employees or customer records.

For live AI analysis, configure the appropriate provider credentials and model identifiers.

---

## API Overview

The following endpoints are described in the project's original documentation. Verify each endpoint and its actual behavior in the current source code before relying on this table.

| Method | Endpoint | Intended purpose |
|---|---|---|
| GET | `/api/health` | Service health status |
| GET | `/api/ai/status` | AI provider status |
| GET | `/api/workspaces` | Retrieve configured workspaces |
| GET | `/api/auth/current` | Retrieve the current demo or authenticated user |
| GET | `/api/tasks` | Retrieve tasks and supported filters |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update supported task fields |
| POST | `/api/tasks/:id/comments` | Add a progress note |
| POST | `/api/tasks/:id/resolve` | Submit resolution evidence |
| POST | `/api/tasks/:id/verify` | Record a verification decision |
| POST | `/api/ai/analyze-issue` | Analyze a supported issue report |
| POST | `/api/ai/compare-resolution` | Compare supported resolution evidence |
| POST | `/api/ai/transcribe-voice` | Transcribe supported audio |
| GET | `/api/dashboard/stats` | Retrieve dashboard metrics |

Authentication, request validation, workspace authorization, and error behavior must be verified against the implementation.

---

## Safety, Trust and Verification

OpsPilot AI is designed around a human-reviewed operational workflow.

### AI-assisted, not AI-authorized

AI outputs may be incomplete, inaccurate, or uncertain. They should inform staff decisions rather than automatically authorize hazardous work.

### Human approval

Where the workflow involves safety-critical equipment or potentially serious hazards, qualified personnel must assess the situation and authorize the appropriate action.

### Evidence matters

An uploaded photograph or an AI-generated comparison does not independently establish that an issue has been resolved safely.

### Traceable decisions

The application should preserve relevant task updates, evidence submissions, and reviewer decisions so the resolution process can be inspected.

### Secure data handling

Private evidence and operational records should only be accessible to authorized users. Workspace isolation, authentication, and authorization must be implemented and tested before production use.

---

## Roadmap

Potential future improvements include:

- Role-based access control with stronger production authentication.
- PostgreSQL-backed persistence and database migrations.
- Configurable escalation policies and service-level targets.
- Notifications and reminders for overdue tasks.
- More advanced team workload optimization.
- Secure cloud attachment storage.
- Expanded audit reporting and export functionality.
- Integration with maintenance and facility-management systems.
- More comprehensive automated and end-to-end testing.
- Deployment monitoring and operational observability.

These are roadmap ideas, not claims that the features are already implemented.

## Contributing

Contributions and constructive feedback are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your work with a clear message.
5. Open a pull request describing the change.

Please do not submit API keys, private operational records, or other sensitive data.

## Security

If you discover a security issue, avoid publishing sensitive exploit details or credentials in a public issue. Contact the repository maintainer through an appropriate private channel.

Never commit secrets to the repository. If a credential has been exposed, revoke or rotate it immediately.


## Author

Name : Hafiz Muhammad Faizan

Project : **OpsPilot AI** 

AI-powered operations management

GitHub: [@thehmfpk](https://github.com/thehmfpk)

---

<p align="center">
  <strong>OpsPilot AI</strong><br>
  Spot it. Solve it. Verify it.
</p>

<p align="center">
  Turning operational problems into accountable, evidence-based workflows.
</p>
