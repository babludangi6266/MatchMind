# MatchMind — AI-Powered Job Matching & ATS Platform

![MatchMind Light Theme Banner](https://raw.githubusercontent.com/babludangi6266/MatchMind/main/docs/matchmind_light_banner.png)

> **MatchMind** is an enterprise-grade, high-dimensional **AI Vector Match & Applicant Tracking System (ATS)** built to overcome the limitations of traditional keyword-based job portals. By converting candidate resumes and job requirements into dense vector embeddings, MatchMind evaluates **semantic intent** combined with **structured hard filters** (salary, experience, location, remote preferences) in a zero-cost infrastructure architecture.

---

## 1. Problem Statement

Traditional ATS tools and job boards rely on **rigid keyword matching** — a resume either contains the exact phrase or gets filtered out. This results in:

- **Qualified Candidate Loss**: Candidates using phrasing variants (e.g. *"React.js"* vs *"ReactJS"*, *"AWS"* vs *"Amazon Web Services"*) get unfairly rejected.
- **Manual Recruiter Fatigue**: Recruiters spend hundreds of hours manually scanning resumes without quantitative match confidence rankings.
- **No Intent Understanding**: Standard databases filter by exact strings rather than calculating contextual relevance.
- **High Enterprise Cost**: Traditional AI-enabled ATS software costs thousands of dollars per month in SaaS subscriptions.

### Solution & Design Constraint
MatchMind implements a **Hybrid Semantic Vector Match Engine** that calculates **Cosine Similarity** between candidate embeddings and job requirement embeddings ($60\%$ weight) merged with **Hard Criteria Filters** ($40\%$ weight). It is designed to run completely on **free-tier infrastructure** ($0 budget constraint: MongoDB Atlas, Google Gemini Free Embedding API, Render/Vercel, and WebSockets over standard HTTP).

---

## 2. Mathematical Matching Engine & Algorithm

The overall Match Confidence Score ($\text{MatchScore} \in [0, 100]$) is computed using a weighted hybrid formula:

$$\text{MatchScore} = 0.6 \times \text{SemanticScore} + 0.4 \times \text{FilterScore}$$

### A. High-Dimensional Vector Cosine Similarity ($\text{SemanticScore}$)
Candidate profile text and job descriptions are transformed into normalized embedding vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$.

The Cosine Similarity between vector $\mathbf{u}$ (Candidate) and vector $\mathbf{v}$ (Job) is:

$$\text{CosSim}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2} = \frac{\sum_{i=1}^{n} u_i v_i}{\sqrt{\sum_{i=1}^{n} u_i^2} \sqrt{\sum_{i=1}^{n} v_i^2}}$$

$$\text{SemanticScore} = \max\left(0, \min\left(100, \frac{\text{CosSim}(\mathbf{u}, \mathbf{v}) + 1}{2} \times 100\right)\right)$$

> **AI Model & Offline Fallback**: MatchMind integrates with **Google Gemini `text-embedding-004`** REST API. If the API key is unconfigured or offline, MatchMind seamlessly executes a **64-Dimensional Deterministic TF-IDF / N-Gram Vector Generator** using SHA-256 hashing normalized to unit L2 norm ($\|\mathbf{u}\|_2 = 1$).

### B. Hard Criteria Evaluation ($\text{FilterScore}$)
Base score starts at $100\%$, with percentage deductions applied for missing hard criteria:

$$\text{FilterScore} = \max\left(0, 100 - \text{Deductions}\right)$$

| Criteria Constraint | Condition | Penalty / Deduction |
| :--- | :--- | :--- |
| **Salary Expectation** | Candidate Target Salary > Job Max Salary | $-20\%$ |
| **Experience Gap** | Candidate Experience < Min Job Experience Required | $-10\%$ per missing year |
| **Remote Preference** | Candidate requires Remote, but Job is On-Site | $-15\%$ |
| **Location Mismatch** | Non-remote job in different city | $-10\%$ |

---

## 3. Core Capabilities & Key Features

### 📄 Apache PDFBox Resume AI Extractor
- Drag-and-drop PDF resume upload.
- Extracts raw unstructured text using **Apache PDFBox 3.0.1**.
- Auto-extracts years of experience and matches 35+ technical skill tags (*Java, Spring Boot, React, TypeScript, Docker, MongoDB, Next.js, System Design, etc.*).

### 🎯 AI Job Match Feed for Candidates
- Ranked list of active job postings sorted by hybrid vector match score.
- Dynamic salary range slider ($50k–$250k), remote preference, and location filters.
- **One-Click Application Modal** with instant candidate cover note attachment.

### 📋 Interactive ATS Kanban Pipeline
- Recruiter recruitment stage columns: `APPLIED` → `SCREENING` → `INTERVIEW` → `OFFER` → `HIRED` / `REJECTED`.
- Drag-and-drop / single-click candidate status movement.
- **Immutable Stage Audit History Log**: Records exact timestamps, notes, and recruiter identity for compliance auditing.

### 📊 Recruiter Analytics & Funnel Aggregation
- Powered by Spring Data MongoDB Aggregation Pipelines.
- Visualizes candidate funnel conversion rates (Screening %, Interview %, Offer %, Hire %).
- Key metrics: Total Active Jobs, Indexed Candidates, Total Applications, and Average Semantic Similarity Score.

### 🔔 Real-Time WebSockets & Notifications
- Built with **Spring STOMP WebSockets** over `/ws`.
- Instant push notifications when candidates apply or recruiters transition application stages.

### 🎨 Ultra-Premium Light SaaS Design System
- Modern visual aesthetics: Pristine porcelain backdrop (`#F8FAFC`), crisp white glassmorphic cards (`#FFFFFF`), vibrant Royal Indigo (`#4F46E5`) primary accents, and Mint Teal (`#0D9488`) success badges.
- Custom typography using Google Fonts **Plus Jakarta Sans** (headings) & **Outfit** (body).

---

## 4. Technology Stack

### Backend Architecture
- **Framework**: Java 19 + Spring Boot 3.2.3
- **Security**: Spring Security + Stateless JWT Authentication (JJWT `0.12.5`) with Role-Based Access (`CANDIDATE`, `RECRUITER`, `ADMIN`)
- **Database**: MongoDB Atlas / Local MongoDB with Spring Data Mongo Repositories
- **PDF Extraction**: Apache PDFBox 3.0.1
- **Real-Time**: Spring STOMP WebSockets (`org.springframework.boot:spring-boot-starter-websocket`)
- **Build System**: Apache Maven 3.9.6 (via Maven Wrapper `mvnw.cmd`)

### Frontend Interface
- **Core Stack**: React 18 + TypeScript + Vite 5
- **Styling**: Vanilla CSS tokens + Tailwind CSS (`darkMode: 'class'`)
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **State Management**: Zustand (with persistent auth & theme store)
- **Typography**: Plus Jakarta Sans & Outfit (Google Fonts)

---

## 5. System Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                  MATCHMIND FRONTEND                               |
|                  React 18 + TypeScript + Vite + Tailwind CSS                      |
|            [Candidate Portal]  [Recruiter Workspace]  [ATS Kanban]                |
+------------------------------------------+----------------------------------------+
                                           | HTTP REST / STOMP WebSockets
                                           v
+-----------------------------------------------------------------------------------+
|                                 SPRING BOOT BACKEND                               |
|                     Spring Security + JWT Bearer Auth Filter                      |
|                                          |                                        |
|   +-----------------------+   +----------v------------+   +-------------------+   |
|   |  ResumeParserService  |   | MatchingEngineService |   | AtsPipelineService|   |
|   |   (Apache PDFBox)     |   | (Vector Similarity)   |   | (State Machine)   |   |
|   +-----------+-----------+   +----------+------------+   +---------+---------+   |
|               |                          |                          |             |
|               +--------------------------+--------------------------+             |
|                                          |                                        |
|                          +---------------v---------------+                        |
|                          |       AiEmbeddingService      |                        |
|                          | Google Gemini text-embedding  |                        |
|                          |  (Offline 64-D Fallback)      |                        |
|                          +---------------+---------------+                        |
+------------------------------------------|----------------------------------------+
                                           v
+-----------------------------------------------------------------------------------+
|                                  DATABASE LAYER                                   |
|                        MongoDB Atlas (Document Store)                             |
|          Collections: users | candidate_profiles | job_postings | applications       |
+-----------------------------------------------------------------------------------+
```

---

## 6. Expected Outcomes & Performance Benchmarks

| Objective Metric | Traditional Keyword ATS | MatchMind AI Vector ATS |
| :--- | :--- | :--- |
| **Phrasing Variance Handling** | ❌ Fails (0% match on synonym) | ✅ 95%+ High Semantic Similarity |
| **Match Score Precision** | ❌ Binary (Yes/No keyword match) | ✅ Quantitative 0.0% – 100.0% Score |
| **Resume Skill Extraction** | ❌ Manual candidate data entry | ✅ Automatic PDF extraction (PDFBox) |
| **Real-time Status Sync** | ❌ Page refresh required | ✅ Instant STOMP WebSocket broadcast |
| **Audit Compliance** | ❌ No history tracking | ✅ Immutable Stage Change Log |
| **Infrastructure Cost** | 💸 $2,000+/mo Enterprise SaaS | 🆓 $0 Free-tier compatible |

---

## 7. Quickstart & Local Setup Guide

### Prerequisites
- **Java**: JDK 19 or higher
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local instance running at `mongodb://localhost:27017` or MongoDB Atlas URI

### Step 1: Start Backend
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
*Backend runs at `http://localhost:8080` (OpenAPI Swagger available at `http://localhost:8080/swagger-ui.html`)*

### Step 2: Start Frontend
```powershell
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`*

---

## 8. Pre-seeded Demo Accounts

The database automatically initializes the following pre-configured demo users on initial startup:

- 👤 **Candidate Demo**:
  - **Email**: `candidate@matchmind.ai`
  - **Password**: `password`
- 💼 **Recruiter Demo**:
  - **Email**: `recruiter@matchmind.ai`
  - **Password**: `password`

---

## 9. API Reference Overview

| HTTP Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new Candidate or Recruiter | No |
| `POST` | `/api/auth/login` | Authenticate & receive JWT Token | No |
| `GET` | `/api/candidates/profile` | Get logged-in candidate profile | Yes |
| `POST` | `/api/candidates/resume/upload` | Upload PDF resume & generate embeddings | Optional / Permitted |
| `POST` | `/api/candidates/matches` | Get AI vector ranked job matches | Yes |
| `GET` | `/api/jobs/my-jobs` | Get recruiter job postings | Yes |
| `POST` | `/api/jobs` | Create job posting & generate embeddings | Yes |
| `GET` | `/api/jobs/{id}/matches` | Get top candidate matches for job | Yes |
| `POST` | `/api/applications/apply` | Submit job application | Yes |
| `PATCH` | `/api/applications/{id}/status` | Transition candidate ATS stage | Yes |
| `GET` | `/api/analytics/summary` | Get recruiter conversion analytics | Yes |

---

## 10. Repository & License

- **GitHub Repository**: [https://github.com/babludangi6266/MatchMind.git](https://github.com/babludangi6266/MatchMind.git)
- **License**: MIT License
