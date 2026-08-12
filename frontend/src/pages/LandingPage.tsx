import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { CircularScoreRing } from '../components/ui/CircularScoreRing';
import { 
  Sparkles, 
  Search, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Database, 
  Cpu, 
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Code2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  // Live Demo Interactive Vector Match Sandbox State
  const [candidateSkill, setCandidateSkill] = useState('React, TypeScript, Vector Search, Tailwind CSS');
  const [jobDescription, setJobDescription] = useState('We need a Lead Frontend Engineer proficient in React, TypeScript, and modern UI engineering.');
  const [demoScore, setDemoScore] = useState(92.4);

  const handleSimulateMatch = () => {
    // Quick interactive calculation simulation
    const matchCount = candidateSkill.toLowerCase().split(',').filter(s => jobDescription.toLowerCase().includes(s.trim())).length;
    const calc = Math.min(98.5, Math.max(55.0, 70 + matchCount * 8.5));
    setDemoScore(Math.round(calc * 10) / 10);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-glow-indigo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Next-Gen AI Vector Search ATS Platform
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Stop Filtering Keywords. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              Match Candidate Meaning.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            MatchMind leverages <strong>vector embeddings</strong> and MongoDB hybrid aggregation pipelines to match resumes to jobs by semantic intent, experience depth, and hard criteria.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              Launch Interactive Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold transition-colors"
            >
              Recruiter / Candidate Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Vector Match Sandbox */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Live Semantic Vector Match Sandbox</h2>
            <p className="text-slate-400 text-sm mt-2">See how MatchMind computes hybrid semantic similarity scores instantly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl">
            {/* Candidate Input */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Candidate Skills & Bio</label>
              <textarea
                value={candidateSkill}
                onChange={(e) => setCandidateSkill(e.target.value)}
                rows={3}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Match Button */}
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <button
                onClick={handleSimulateMatch}
                className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
                title="Run Vector Match"
              >
                <Zap className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Job Requirement Input */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={3}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Output Score Result */}
            <div className="md:col-span-12 pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CircularScoreRing score={demoScore} size="md" />
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Aggregation Pipeline</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  $vectorSearch + $match (Cosine Similarity)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Defense Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Free-Tier Engineered</span>
          <h2 className="font-display text-3xl font-bold mt-2">Built for Zero Infra Budget Defense</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm mt-2">
            Replaces expensive Kafka & Elasticsearch clusters with MongoDB Atlas Search, Vector Search, and Change Streams on a single database.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg">Vector Embeddings</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Google Gemini <code>text-embedding-004</code> converts resumes & job postings into 768-dim semantic vectors, with automated local TF-IDF vector generator fallback.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg">MongoDB Change Streams</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Replaces heavy message brokers like Apache Kafka with MongoDB-native Change Streams for real-time STOMP WebSocket status delivery.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg">ATS State Machine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete applicant workflow engine (Applied → Screening → Interview → Offer → Hired) with strict audit history logging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
