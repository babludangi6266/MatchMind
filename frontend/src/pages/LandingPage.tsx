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
  ShieldCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  // Live Demo Interactive Vector Match Sandbox State
  const [candidateSkill, setCandidateSkill] = useState('React, TypeScript, Vector Search, Tailwind CSS, System Design');
  const [jobDescription, setJobDescription] = useState('Looking for a Lead Frontend Engineer with deep expertise in React, TypeScript, and vector search user interfaces.');
  const [demoScore, setDemoScore] = useState(94.2);

  const handleSimulateMatch = () => {
    const matchCount = candidateSkill.toLowerCase().split(',').filter(s => jobDescription.toLowerCase().includes(s.trim())).length;
    const calc = Math.min(98.5, Math.max(55.0, 72 + matchCount * 7.5));
    setDemoScore(Math.round(calc * 10) / 10);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-glow-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            AI-Powered Hybrid Vector Search ATS
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] text-slate-900 dark:text-white">
            Stop Searching Keywords. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
              Match Candidate Intent.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            MatchMind calculates <strong>high-dimensional vector embeddings</strong> and combines semantic similarity with hard criteria filters in a single, high-speed aggregation pipeline.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm transition-all"
            >
              Recruiter & Candidate Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Vector Match Sandbox */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Live Semantic Match Sandbox</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Test how MatchMind converts unstructured resume text into vector match confidence scores</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
            {/* Candidate Input */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Candidate Resume Skills & Bio</label>
              <textarea
                value={candidateSkill}
                onChange={(e) => setCandidateSkill(e.target.value)}
                rows={3}
                className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            {/* Match Button */}
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <button
                onClick={handleSimulateMatch}
                className="w-13 h-13 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
                title="Calculate Vector Match"
              >
                <Zap className="w-6 h-6 fill-current" />
              </button>
            </div>

            {/* Job Requirement Input */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={3}
                className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            {/* Output Score Result */}
            <div className="md:col-span-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
              <CircularScoreRing score={demoScore} size="md" />
              <div className="text-right">
                <span className="text-xs text-slate-500 block font-semibold">Hybrid Query Pipeline</span>
                <span className="text-xs font-mono text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-500/20 font-bold">
                  $vectorSearch + Cosine Distance
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Enterprise Technical Design</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Defensible Zero-Infra Architecture</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Engineered to run seamlessly on standard MongoDB Atlas with native Change Streams replacing expensive message brokers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Semantic Vector Embeddings</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Maps candidate profiles and job requirements into high-dimensional space via Google Gemini <code>text-embedding-004</code> with deterministic offline fallback.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">MongoDB Change Streams</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Real-time application event propagation via Spring STOMP WebSockets and MongoDB Change Streams without Kafka overhead.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">ATS State Workflow</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Complete applicant stage transitions (Applied → Screening → Interview → Offer → Hired) backed by immutable audit history logs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
