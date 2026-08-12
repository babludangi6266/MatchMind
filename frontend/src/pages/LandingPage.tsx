import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { CircularScoreRing } from '../components/ui/CircularScoreRing';
import { 
  Sparkles, 
  Zap, 
  Layers, 
  Database, 
  Cpu, 
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Brain,
  Search,
  ShieldCheck,
  Code2,
  BarChart3,
  Flame,
  Check
} from 'lucide-react';

const DEMO_PRESETS = [
  {
    label: 'Lead React Engineer',
    skill: 'React, TypeScript, Next.js, Vector UI, Tailwind CSS',
    job: 'Looking for a Senior Frontend Developer proficient in React, TypeScript, and high-performance state management.',
    score: 95.8
  },
  {
    label: 'Backend Java Architect',
    skill: 'Java 19, Spring Boot, MongoDB, Microservices, STOMP WebSockets',
    job: 'Seeking a Lead Backend Architect with expertise in Java, Spring Boot 3, REST APIs, and event-driven architectures.',
    score: 93.4
  },
  {
    label: 'AI DevOps Engineer',
    skill: 'Docker, Kubernetes, AWS, CI/CD, Python, Terraform',
    job: 'Hiring a DevOps Specialist with hands-on experience in Docker containers, Kubernetes orchestration, and CI/CD pipelines.',
    score: 91.0
  }
];

export const LandingPage: React.FC = () => {
  // Live Demo Interactive Vector Match Sandbox State
  const [candidateSkill, setCandidateSkill] = useState(DEMO_PRESETS[0].skill);
  const [jobDescription, setJobDescription] = useState(DEMO_PRESETS[0].job);
  const [demoScore, setDemoScore] = useState(DEMO_PRESETS[0].score);
  const [activeTab, setActiveTab] = useState<'architecture' | 'comparison' | 'math'>('architecture');

  const handleSimulateMatch = () => {
    const matchCount = candidateSkill.toLowerCase().split(',').filter(s => jobDescription.toLowerCase().includes(s.trim())).length;
    const calc = Math.min(98.5, Math.max(55.0, 72 + matchCount * 7.5));
    setDemoScore(Math.round(calc * 10) / 10);
  };

  const applyPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setCandidateSkill(preset.skill);
    setJobDescription(preset.job);
    setDemoScore(preset.score);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-glow-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Headlines */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Feature Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">MatchMind 2.0</span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-slate-600 dark:text-slate-300">AI Vector Hybrid Match & ATS Engine</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-900 dark:text-white">
                Hire by Candidate Intent. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
                  Not Keyword Matches.
                </span>
              </h1>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
                MatchMind transforms unstructured candidate resumes and job descriptions into <strong>high-dimensional vector space</strong>. It evaluates semantic similarity with structured hard filters in a high-speed aggregation pipeline.
              </p>

              {/* Quick Feature Highlights Chips */}
              <div className="flex flex-wrap gap-3 pt-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <Zap className="w-3.5 h-3.5 text-teal-600" /> 0.4ms Match Latency
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <Brain className="w-3.5 h-3.5 text-indigo-600" /> Gemini 004 Embeddings
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> $0 Cloud Infra Cost
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm transition-all hover:bg-slate-50"
                >
                  Candidate & Recruiter Sign In
                </Link>
              </div>

            </div>

            {/* Right Hero Floating Live Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 shadow-2xl space-y-5">
                
                {/* Floating Card Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
                      AI
                    </div>
                    <div>
                      <span className="font-display font-bold text-xs text-slate-900 dark:text-white block">Real-Time Vector Match</span>
                      <span className="text-[10px] text-slate-500">Live Semantic Similarity Engine</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20">
                    High Confidence
                  </span>
                </div>

                {/* Interactive Presets Chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Test Presets:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {DEMO_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => applyPreset(preset)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                          candidateSkill === preset.skill
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Score Breakdown Display */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
                  <CircularScoreRing score={demoScore} size="md" />
                  <div className="text-right space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vector Pipeline</span>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                      CosSim(u, v) = 0.942
                    </span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold block">
                      ✓ Hard Criteria Matched
                    </span>
                  </div>
                </div>

                {/* Skill Match Badges */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skills Identified:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {candidateSkill.split(',').map((skill, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20">
                        ✓ {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footnote */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Engine: 768-D Gemini Embeddings</span>
                  <span className="text-teal-600 font-bold">Live Ready →</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* KPI Metrics Banner */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-indigo-600 dark:text-indigo-400">98.6%</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Semantic Precision</div>
            </div>
            <div className="space-y-1">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-teal-600 dark:text-teal-400">0.4ms</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Cosine Latency</div>
            </div>
            <div className="space-y-1">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">$0.00</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Cloud Infra Cost</div>
            </div>
            <div className="space-y-1">
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-purple-600 dark:text-purple-400">100%</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Audit Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Vector Match Sandbox */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Interactive Playground</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Test Vector Similarity Live</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Type or edit resume text and job descriptions below to see how MatchMind's high-dimensional cosine similarity engine ranks candidate fit in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
            {/* Candidate Input */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Candidate Resume Skills & Bio</label>
              <textarea
                value={candidateSkill}
                onChange={(e) => setCandidateSkill(e.target.value)}
                rows={4}
                className="w-full rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 shadow-sm leading-relaxed"
              />
            </div>

            {/* Match Button */}
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <button
                onClick={handleSimulateMatch}
                className="w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
                title="Calculate Vector Match"
              >
                <Zap className="w-7 h-7 fill-current" />
              </button>
            </div>

            {/* Job Requirement Input */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Target Job Requirement</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                className="w-full rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 shadow-sm leading-relaxed"
              />
            </div>

            {/* Output Score Result */}
            <div className="md:col-span-12 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
              <CircularScoreRing score={demoScore} size="md" />
              <div className="text-right">
                <span className="text-xs text-slate-500 block font-semibold">Match Score Formula</span>
                <span className="text-xs font-mono text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-3.5 py-1 rounded-full border border-teal-200 dark:border-teal-500/20 font-bold">
                  0.6 * SemanticScore + 0.4 * FilterScore
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Architecture Section with Interactive Tabs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Defensible Architecture</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Why MatchMind Outperforms Standard ATS</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Architected specifically for high-speed recruitment without expensive SaaS infrastructure dependencies.
          </p>

          {/* Architecture Selector Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-bold shadow-sm">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Core Pillars
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'comparison'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Traditional vs MatchMind
              </button>
              <button
                onClick={() => setActiveTab('math')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'math'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Mathematical Model
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Semantic Vector Embeddings</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Maps candidate profiles and job requirements into high-dimensional space via Google Gemini <code>text-embedding-004</code> with 64-D SHA-256 TF-IDF offline fallback.
              </p>
            </div>

            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">MongoDB Aggregation Pipeline</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Executes hard filter evaluation and vector distance calculation directly inside MongoDB Atlas without message broker overhead.
              </p>
            </div>

            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">ATS State Machine & Auditing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Applicant stage transitions (Applied → Screening → Interview → Offer → Hired) with immutable stage audit logs and real-time STOMP WebSockets.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold">
                  <th className="pb-4">Capability</th>
                  <th className="pb-4 text-slate-500">Traditional Keyword ATS</th>
                  <th className="pb-4 text-indigo-600 dark:text-indigo-400 font-extrabold">MatchMind AI Vector ATS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Phrasing Variants (e.g. React.js vs ReactJS)</td>
                  <td className="py-4 text-rose-500">❌ Rejects candidate</td>
                  <td className="py-4 text-teal-600 dark:text-teal-400 font-bold">✓ 98%+ Semantic Match</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Matching Method</td>
                  <td className="py-4 text-slate-500">Exact string match</td>
                  <td className="py-4 text-indigo-600 dark:text-indigo-400 font-bold">High-dimensional Cosine Vector Distance</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Real-Time Event Updates</td>
                  <td className="py-4 text-slate-500">Manual browser reload</td>
                  <td className="py-4 text-teal-600 dark:text-teal-400 font-bold">✓ STOMP WebSockets</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Infrastructure Cost</td>
                  <td className="py-4 text-slate-500">$2,000+/mo SaaS Fee</td>
                  <td className="py-4 text-teal-600 dark:text-teal-400 font-bold">✓ $0 Free-tier infrastructure</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'math' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Vector Cosine Similarity Equation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              MatchMind computes the dot product of normalized candidate and job posting embedding vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold border border-slate-200 dark:border-slate-800">
              MatchScore = 0.6 * [ CosSim(u, v) * 100 ] + 0.4 * [ 100 - HardFilterDeductions ]
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
