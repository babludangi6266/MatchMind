import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { CircularScoreRing } from '../components/ui/CircularScoreRing';
import { api } from '../services/api';
import { 
  Plus, 
  Briefcase, 
  UserCheck, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  Kanban,
  Building2,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecruiterDashboardPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [topCandidates, setTopCandidates] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // New Job Form State
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('React, TypeScript, Tailwind CSS');
  const [minSalary, setMinSalary] = useState(130000);
  const [maxSalary, setMaxSalary] = useState(160000);
  const [minExperienceYears, setMinExperienceYears] = useState(4);
  const [remote, setRemote] = useState(true);
  const [creating, setCreating] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await api.jobs.getRecruiterJobs().catch(() => []);
      setJobs(data);
      if (data.length > 0) {
        setSelectedJob(data[0]);
        loadTopCandidates(data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTopCandidates = async (jobId: string) => {
    try {
      const list = await api.jobs.getTopCandidates(jobId).catch(() => []);
      setTopCandidates(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const skills = skillsRequired.split(',').map((s) => s.trim()).filter(Boolean);
      const newJob = await api.jobs.create({
        title,
        company,
        location,
        description,
        skillsRequired: skills,
        minSalary,
        maxSalary,
        minExperienceYears,
        remote,
      });
      setShowCreateModal(false);
      setTitle('');
      setDescription('');
      fetchJobs();
    } catch (err: any) {
      alert(err.message || 'Job creation failed');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="font-display font-bold text-2xl text-white">Recruiter Workspace</h1>
            <p className="text-xs text-slate-400">Post positions, analyze hybrid vector candidate matches, and manage ATS pipelines.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/recruiter/ats"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors"
            >
              <Kanban className="w-4 h-4 text-indigo-400" /> ATS Kanban Pipeline
            </Link>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" /> Create Job Posting
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Job Postings List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-semibold text-sm text-slate-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" /> Active Job Postings ({jobs.length})
            </h3>

            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {jobs.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                  No job postings created yet. Click "Create Job Posting" to add one.
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                      loadTopCandidates(job.id);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      selectedJob?.id === job.id
                        ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold font-display text-sm">{job.title}</h4>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {job.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1">{job.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                      <span>${(job.minSalary / 1000).toFixed(0)}k - ${(job.maxSalary / 1000).toFixed(0)}k</span>
                      <span className="text-indigo-400 font-semibold">View AI Candidates →</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Candidates Ranked by Semantic Similarity */}
          <div className="lg:col-span-7 space-y-4">
            {selectedJob ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div>
                    <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Top AI Candidates Match Feed</span>
                    <h3 className="font-display font-bold text-lg text-white">{selectedJob.title}</h3>
                  </div>
                  <Link
                    to={`/recruiter/ats?jobId=${selectedJob.id}`}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Open Job ATS Pipeline →
                  </Link>
                </div>

                <div className="space-y-3">
                  {topCandidates.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                      No candidate profile matches calculated yet.
                    </div>
                  ) : (
                    topCandidates.map((c, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl space-y-3 hover:border-indigo-500/40 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-sm text-white">{c.candidateName}</h4>
                            <p className="text-xs text-slate-400">{c.candidateTitle}</p>
                          </div>
                          <CircularScoreRing score={c.matchScore} size="md" />
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block">Semantic Vector Score</span>
                            <span className="font-semibold text-indigo-400">{c.semanticScore}%</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block">Hard Filters Score</span>
                            <span className="font-semibold text-emerald-400">{c.filterScore}%</span>
                          </div>
                        </div>

                        {/* Matching Skills */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-slate-400 font-semibold mr-1">Matching Skills:</span>
                          {c.matchingSkills?.slice(0, 4).map((s: string, i: number) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                Select a job posting on the left to inspect AI-ranked candidate vector matches.
              </div>
            )}
          </div>
        </div>

        {/* Create Job Posting Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-6">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">New Position</span>
                  <h3 className="text-lg font-bold font-display text-white mt-1">Create Job Posting & Vector Embedding</h3>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Job Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Lead Frontend Engineer"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Company / Org Name</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nexus AI Technologies"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Min Salary ($/yr)</label>
                    <input
                      type="number"
                      value={minSalary}
                      onChange={(e) => setMinSalary(Number(e.target.value))}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Max Salary ($/yr)</label>
                    <input
                      type="number"
                      value={maxSalary}
                      onChange={(e) => setMaxSalary(Number(e.target.value))}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-medium block mb-1">Min Experience (Yrs)</label>
                    <input
                      type="number"
                      value={minExperienceYears}
                      onChange={(e) => setMinExperienceYears(Number(e.target.value))}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Skills Required (Comma separated)</label>
                  <input
                    type="text"
                    value={skillsRequired}
                    onChange={(e) => setSkillsRequired(e.target.value)}
                    placeholder="React, TypeScript, Tailwind CSS, WebSockets"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">Job Description</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe role responsibilities, team structure, and technologies..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
                  >
                    {creating ? 'Publishing...' : 'Publish Job & Embed'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
