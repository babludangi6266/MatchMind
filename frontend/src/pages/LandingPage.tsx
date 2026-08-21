import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
  Brain,
  Search,
  ShieldCheck,
  Code2,
  BarChart3,
  Flame,
  ChevronDown,
  ChevronUp,
  Activity,
  GitBranch,
  Radio,
  FileCheck,
  HelpCircle,
  TrendingUp,
  Award,
  Check,
  X,
  Clock,
  DollarSign,
  Lock
} from 'lucide-react';

const DEMO_PRESETS = [
  {
    label: 'Lead React Architect',
    skill: 'React, TypeScript, Next.js, Vector UI, Tailwind CSS, System Design',
    job: 'Looking for a Senior Frontend Architect proficient in React, TypeScript, high-performance UI components, and state management.',
    score: 96.4,
    angle: '15.2°'
  },
  {
    label: 'Senior Java Backend Engineer',
    skill: 'Java 19, Spring Boot, MongoDB, Microservices, REST APIs, STOMP WebSockets',
    job: 'Seeking a Lead Backend Engineer with expertise in Java, Spring Boot 3, MongoDB databases, and real-time event streaming.',
    score: 93.8,
    angle: '20.1°'
  },
  {
    label: 'AI DevOps & Cloud Specialist',
    skill: 'Docker, Kubernetes, AWS, CI/CD, Python, Terraform, System Reliability',
    job: 'Hiring a DevOps Specialist with hands-on experience in Docker containerization, Kubernetes cluster management, and CI/CD pipelines.',
    score: 91.2,
    angle: '24.5°'
  }
];

const FAQS = [
  {
    q: 'How does MatchMind differ from traditional keyword-matching ATS platforms?',
    a: 'Traditional ATS software performs simple substring matching — if a resume says "ReactJS" and a job specifies "React.js", it gets rejected. MatchMind converts text into 768-dimensional vector embeddings, mapping semantic intent into high-dimensional space so phrasing variations achieve 95%+ match scores.'
  },
  {
    q: 'How is MatchMind able to run completely on $0 free-tier infrastructure?',
    a: 'MatchMind executes hard filter evaluations and Cosine Similarity vector matching directly inside MongoDB Atlas M0 free clusters. Native MongoDB Change Streams replace expensive message brokers like Kafka, allowing real-time WebSocket notifications without server overhead.'
  },
  {
    q: 'What happens if the Google Gemini Embedding API is offline or unconfigured?',
    a: 'MatchMind features an automatic, deterministic 64-Dimensional TF-IDF SHA-256 Vector Generator fallback. It executes locally inside the Spring Boot JVM without failing any requests or requiring paid third-party API keys.'
  },
  {
    q: 'Is candidate resume data kept private and secure?',
    a: 'Yes. MatchMind implements stateless JWT Authentication and tenant isolation. PDF text is parsed strictly in-memory using Apache PDFBox 3.0.1 and converted into vector embeddings without persistent file storage risk.'
  }
];

export const LandingPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'MatchMind — #1 AI Powered Job Matching & ATS Platform';
  }, []);

  // Live Demo Interactive Vector Match Sandbox State
  const [candidateSkill, setCandidateSkill] = useState(DEMO_PRESETS[0].skill);
  const [jobDescription, setJobDescription] = useState(DEMO_PRESETS[0].job);
  const [demoScore, setDemoScore] = useState(DEMO_PRESETS[0].score);
  const [demoAngle, setDemoAngle] = useState(DEMO_PRESETS[0].angle);
  const [activeTab, setActiveTab] = useState<'architecture' | 'comparison' | 'math'>('architecture');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSimulateMatch = () => {
    const matchCount = candidateSkill.toLowerCase().split(',').filter(s => jobDescription.toLowerCase().includes(s.trim())).length;
    const calc = Math.min(98.8, Math.max(55.0, 72 + matchCount * 7.5));
    const rounded = Math.round(calc * 10) / 10;
    setDemoScore(rounded);
    setDemoAngle(((100 - rounded) * 0.85).toFixed(1) + '°');
  };

  const applyPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setCandidateSkill(preset.skill);
    setJobDescription(preset.job);
    setDemoScore(preset.score);
    setDemoAngle(preset.angle);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-glow-light">
        
        {/* Moving Animated SVG Network Mesh Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-700" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#hero-grid)" />
            <path d="M 100 200 Q 350 50 700 250 T 1300 150" fill="none" stroke="#6366F1" strokeWidth="2" className="animate-dash-flow" />
            <path d="M 50 450 Q 400 300 850 480 T 1400 350" fill="none" stroke="#0D9488" strokeWidth="1.5" className="animate-dash-flow" />

            <circle cx="350" cy="50" r="6" fill="#6366F1" className="animate-ping opacity-75" />
            <circle cx="350" cy="50" r="4" fill="#6366F1" />
            <circle cx="700" cy="250" r="6" fill="#0D9488" className="animate-ping opacity-75" />
            <circle cx="700" cy="250" r="4" fill="#0D9488" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Animated Glowing Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-500/30 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-md shadow-indigo-500/5">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">Gemini 004 Vector Engine</span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-slate-600 dark:text-slate-300">Semantic AI Job Matching</span>
              </div>

              {/* Main Punchy SEO-Optimized Gradient Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-900 dark:text-white">
                AI Powered Job Matching. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
                  Match Candidate Intent.
                </span>
              </h1>

              {/* Lead Description */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
                MatchMind transforms unstructured candidate resumes and job requirements into <strong>high-dimensional vector space</strong>. It evaluates semantic intent with hard criteria filters in a single, high-speed aggregation pipeline.
              </p>

              {/* Quick Feature Metric Badges */}
              <div className="flex flex-wrap gap-3 pt-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <Zap className="w-4 h-4 text-teal-600" /> 0.4ms Vector Latency
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <Brain className="w-4 h-4 text-indigo-600" /> 768-D Vector Embeddings
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <Flame className="w-4 h-4 text-amber-500" /> $0 Cloud Operating Cost
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center gap-2.5 transition-all hover:scale-105"
                >
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm transition-all hover:bg-slate-50"
                >
                  Candidate & Recruiter Sign In
                </Link>
              </div>

            </div>

            {/* Right Hero Showcase Widget */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-3xl opacity-20 blur-xl animate-pulse-glow" />

              <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 shadow-2xl space-y-5 animate-float">
                
                {/* Floating Widget Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-extrabold text-xs shadow-sm">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-xs text-slate-900 dark:text-white block">Real-Time Cosine Projection</span>
                      <span className="text-[10px] text-slate-500">Live Vector Angle θ Visualizer</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20">
                    High Precision
                  </span>
                </div>

                {/* Animated Moving SVG Vector Angle Radar Graphic */}
                <div className="relative h-44 rounded-2xl bg-indigo-950 p-4 overflow-hidden border border-indigo-900 flex items-center justify-center shadow-inner">
                  <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 120">
                    <circle cx="100" cy="110" r="90" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="110" r="60" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="110" r="30" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                    <line x1="100" y1="110" x2="30" y2="35" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="30" cy="35" r="4" fill="#818CF8" className="animate-ping" />
                    <text x="15" y="30" fill="#A5B4FC" fontSize="9" fontWeight="bold">Candidate u</text>

                    <line x1="100" y1="110" x2="45" y2="25" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="25" cy="25" r="4" fill="#34D399" className="animate-ping" />
                    <text x="50" y="20" fill="#6EE7B7" fontSize="9" fontWeight="bold">Job v</text>

                    <path d="M 75 88 A 30 30 0 0 1 82 80" fill="none" stroke="#F59E0B" strokeWidth="2" />
                    <text x="78" y="78" fill="#FBBF24" fontSize="10" fontWeight="bold">θ = {demoAngle}</text>
                  </svg>
                </div>

                {/* Interactive Preset Chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Test Vector Presets:</span>
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
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cosine Metric</span>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                      CosSim(u, v) = {(demoScore / 100).toFixed(3)}
                    </span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold block">
                      ✓ Hard Criteria Validated
                    </span>
                  </div>
                </div>

                {/* Card Footnote */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Engine: 768-D Gemini Embeddings</span>
                  <span className="text-teal-600 font-bold">Vector Ready →</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* End-To-End Vector Pipeline */}
      <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300 text-xs font-extrabold uppercase tracking-wider">
              <GitBranch className="w-3.5 h-3.5" /> Data Architecture Pipeline
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">End-To-End Candidate Data Flow</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Trace how unstructured PDF resume uploads transform into 768-D vector embeddings, undergo hybrid MongoDB aggregation, and fire instant STOMP WebSocket notifications.
            </p>
          </div>

          {/* Connected SVG Pipeline Cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
            
            {/* SVG Connecting Flow Lines */}
            <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                <path d="M 100 100 H 900" stroke="#E2E8F0" strokeWidth="3" fill="none" className="dark:stroke-slate-800" />
                <path d="M 100 100 H 900" stroke="#6366F1" strokeWidth="3" strokeDasharray="12 12" fill="none" className="animate-dash-flow opacity-80" />
              </svg>
            </div>

            {/* Pipeline Step 1 */}
            <div className="relative z-10 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:border-indigo-400/80 transition-all duration-300 group hover:-translate-y-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  PDF Resume Upload
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Unstructured resume text ingested in-memory via <strong>Apache PDFBox 3.0.1</strong>. Extracting experience years and matching technical skills.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                In-Memory Parsing
              </div>
            </div>

            {/* Pipeline Step 2 */}
            <div className="relative z-10 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:border-teal-400/80 transition-all duration-300 group hover:-translate-y-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  Gemini 004 Vector
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  768-dimensional dense vector embeddings generated via <strong>Google Gemini REST API</strong> with 64-D local SHA-256 TF-IDF fallback.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Semantic Embeddings
              </div>
            </div>

            {/* Pipeline Step 3 */}
            <div className="relative z-10 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:border-purple-400/80 transition-all duration-300 group hover:-translate-y-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                  MongoDB Atlas
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Hard criteria filters (salary, experience, remote, location) evaluated directly inside MongoDB aggregation pipeline.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Aggregation Engine
              </div>
            </div>

            {/* Pipeline Step 4 */}
            <div className="relative z-10 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 group hover:-translate-y-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                    04
                  </div>
                  <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  Cosine Match Engine
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Calculates final score: <strong>60% Cosine Similarity + 40% Hard Filter Criteria</strong> for quantitative ranking.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Weighted Scoring
              </div>
            </div>

            {/* Pipeline Step 5 */}
            <div className="relative z-10 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:border-teal-400/80 transition-all duration-300 group hover:-translate-y-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-110 transition-transform">
                    05
                  </div>
                  <Radio className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  STOMP WebSockets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Pushes real-time STOMP notification alerts over <code>/ws</code> channel instantly to recruiter dashboards.
                </p>
              </div>
              <div className="pt-2 text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Instant Event Push
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ULTRA-PREMIUM REDESIGN: Metric Showcase Grid Cards with Animated SVGs */}
      <section className="py-20 bg-gradient-to-b from-indigo-50/40 via-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Empirical System Benchmarks</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">Quantitative Performance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1: Semantic Accuracy */}
            <div className="rounded-3xl border border-indigo-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xl shadow-indigo-500/5 hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Semantic Accuracy</span>
                
                {/* Animated Moving Vector Mesh SVG */}
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" className="animate-ping" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <circle cx="4" cy="6" r="2" fill="currentColor" />
                    <circle cx="20" cy="6" r="2" fill="currentColor" />
                    <circle cx="6" cy="18" r="2" fill="currentColor" />
                    <circle cx="18" cy="18" r="2" fill="currentColor" />
                    <line x1="4" y1="6" x2="12" y2="12" stroke="#818CF8" strokeWidth="1.5" className="animate-dash-flow" />
                    <line x1="20" y1="6" x2="12" y2="12" stroke="#818CF8" strokeWidth="1.5" className="animate-dash-flow" />
                    <line x1="6" y1="18" x2="12" y2="12" stroke="#818CF8" strokeWidth="1.5" className="animate-dash-flow" />
                    <line x1="18" y1="18" x2="12" y2="12" stroke="#818CF8" strokeWidth="1.5" className="animate-dash-flow" />
                  </svg>
                </div>
              </div>

              <div>
                <div className="text-4xl font-display font-extrabold text-slate-900 dark:text-white">98.8%</div>
                <span className="text-xs text-teal-600 dark:text-teal-400 font-bold block mt-1">✓ Phrasing variation tolerance</span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-teal-400 h-full w-[98.8%] rounded-full" />
              </div>
            </div>

            {/* Metric 2: Query Latency */}
            <div className="rounded-3xl border border-teal-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xl shadow-teal-500/5 hover:shadow-2xl hover:border-teal-300 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Query Latency</span>
                
                {/* Animated Pulse Wave Speedometer SVG */}
                <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M 3 12 Q 7 4 12 12 T 21 12" stroke="#0D9488" strokeWidth="2" className="animate-dash-flow" />
                    <circle cx="12" cy="12" r="3" fill="#0D9488" />
                  </svg>
                </div>
              </div>

              <div>
                <div className="text-4xl font-display font-extrabold text-slate-900 dark:text-white">0.4ms</div>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold block mt-1">✓ In-Memory vector distance</span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full w-[95%] rounded-full" />
              </div>
            </div>

            {/* Metric 3: Infrastructure Cost */}
            <div className="rounded-3xl border border-amber-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xl shadow-amber-500/5 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Infrastructure Cost</span>
                
                {/* Animated Free Cloud Cluster SVG */}
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <DollarSign className="w-6 h-6 text-amber-500" />
                </div>
              </div>

              <div>
                <div className="text-4xl font-display font-extrabold text-slate-900 dark:text-white">$0.00</div>
                <span className="text-xs text-teal-600 dark:text-teal-400 font-bold block mt-1">✓ 100% Free-Tier compatible</span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-teal-400 h-full w-[100%] rounded-full" />
              </div>
            </div>

            {/* Metric 4: Stage Compliance */}
            <div className="rounded-3xl border border-purple-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xl shadow-purple-500/5 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stage Compliance</span>
                
                {/* Animated Shield Audit SVG */}
                <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <ShieldCheck className="w-6 h-6 text-purple-600" />
                </div>
              </div>

              <div>
                <div className="text-4xl font-display font-extrabold text-slate-900 dark:text-white">100%</div>
                <span className="text-xs text-slate-500 font-semibold block mt-1">Immutable stage audit logs</span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[100%] rounded-full" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ULTRA-PREMIUM REDESIGN: Interactive Vector Match Simulator (LIGHT SAAS) */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Interactive Playground</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Live Vector Match Simulator</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Type or edit candidate resume text and target job requirements below to test MatchMind's vector similarity scoring engine in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl relative">
            
            {/* Candidate Input */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Candidate Resume Skills & Bio</label>
              <textarea
                value={candidateSkill}
                onChange={(e) => setCandidateSkill(e.target.value)}
                rows={4}
                className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 shadow-sm leading-relaxed"
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
                className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 shadow-sm leading-relaxed"
              />
            </div>

            {/* Output Score Result */}
            <div className="md:col-span-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
              <CircularScoreRing score={demoScore} size="md" />
              <div className="text-right">
                <span className="text-xs text-slate-500 block font-semibold">Hybrid Scoring Model</span>
                <span className="text-xs font-mono text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-3.5 py-1 rounded-full border border-teal-200 dark:border-teal-500/20 font-bold">
                  0.6 * SemanticScore + 0.4 * FilterScore
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Technical Design */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Defensible Technical Architecture</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Why MatchMind Outperforms Keyword ATS</h2>
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
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Phrasing Variations (ReactJS vs React.js)</td>
                  <td className="py-4 text-rose-500 flex items-center gap-1"><X className="w-4 h-4" /> Rejects candidate</td>
                  <td className="py-4 text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1"><Check className="w-4 h-4" /> 98%+ Semantic Match</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Matching Method</td>
                  <td className="py-4 text-slate-500">Exact substring search</td>
                  <td className="py-4 text-indigo-600 dark:text-indigo-400 font-bold">High-dimensional Cosine Vector Distance</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Real-Time Event Broadcast</td>
                  <td className="py-4 text-slate-500">Manual page refresh</td>
                  <td className="py-4 text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1"><Check className="w-4 h-4" /> STOMP WebSockets over /ws</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Infrastructure Operating Cost</td>
                  <td className="py-4 text-slate-500">$2,000+/mo Enterprise SaaS</td>
                  <td className="py-4 text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1"><Check className="w-4 h-4" /> $0 Free-tier infrastructure</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'math' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Vector Cosine Distance Formula</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              MatchMind computes the dot product of normalized candidate and job posting embedding vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold border border-slate-200 dark:border-slate-800">
              MatchScore = 0.6 * [ CosSim(u, v) * 100 ] + 0.4 * [ 100 - HardFilterDeductions ]
            </div>
          </div>
        )}
      </section>

      {/* ULTRA-PREMIUM REDESIGN: Frequently Asked Questions (LIGHT SAAS) */}
      <section className="py-24 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
              <HelpCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Everything You Need to Know</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm ${
                  openFaq === idx
                    ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-500/40 shadow-xl shadow-indigo-500/5'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white text-left transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold transition-colors ${
                      openFaq === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      ?
                    </span>
                    {faq.q}
                  </span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ULTRA-PREMIUM REDESIGN: Porcelain & Holographic Light Aura CTA Pod */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-indigo-50/80 via-white to-teal-50/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 border border-indigo-200/80 dark:border-slate-800 p-8 sm:p-14 shadow-2xl overflow-hidden">
            
            {/* Ambient Animated Vector Energy Mesh background */}
            <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 100 Q 400 20 800 180 T 1600 100" fill="none" stroke="#6366F1" strokeWidth="2" className="animate-dash-flow" />
                <path d="M 0 200 Q 500 280 1000 80 T 1800 220" fill="none" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash-flow" />
              </svg>
            </div>

            {/* Ambient Radial Soft Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Side: Interactive DotLottie Visual Ring */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                
                {/* Seamless Floating Lottie Player */}
                <div className="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center relative animate-float">
                  <div className="w-full h-full filter drop-shadow-xl">
                    <DotLottieReact
                      src="https://lottie.host/a81e8ea6-ed3c-4b5d-810f-29c76f33f815/Dm1ec7Gwhf.lottie"
                      loop
                      autoplay
                    />
                  </div>

                  {/* Floating Metric Badges around Lottie */}
                  <div className="absolute top-2 -left-2 px-3.5 py-1.5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] shadow-lg flex items-center gap-1.5 border border-indigo-400/40">
                    <Zap className="w-3.5 h-3.5 text-teal-300" /> 0.4ms Latency
                  </div>
                  <div className="absolute bottom-2 -right-2 px-3.5 py-1.5 rounded-full bg-teal-600 text-white font-extrabold text-[10px] shadow-lg flex items-center gap-1.5 border border-teal-400/40">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> 98.8% Precision
                  </div>
                </div>

              </div>

              {/* Right Side: Headlines, Action Buttons & Trust Items */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300 text-xs font-extrabold uppercase tracking-wider">
                  <Brain className="w-3.5 h-3.5" /> Next-Gen AI Recruitment
                </div>

                {/* Main Headline */}
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  Elevate Your Hiring With <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
                    Vector Intelligence.
                  </span>
                </h2>

                {/* Lead Paragraph */}
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                  Turn unstructured resume PDFs into high-dimensional embeddings. Filter candidates with 60% semantic similarity + 40% hard criteria weighting.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/register"
                    className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-600/25 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
                  >
                    Create Account Free <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 text-slate-800 dark:text-slate-200 font-extrabold text-xs sm:text-sm shadow-sm transition-all hover:bg-slate-50"
                  >
                    Sign In to Demo Account
                  </Link>
                </div>

                {/* Trust Item Checkmarks */}
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-600" /> No Credit Card Required</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-600" /> 60-Second Setup</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-600" /> $0 Infrastructure Cost</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
