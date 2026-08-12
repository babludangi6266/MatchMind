import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { CircularScoreRing } from '../components/ui/CircularScoreRing';
import { api } from '../services/api';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Send,
  Building2,
  Clock
} from 'lucide-react';

export const CandidateDashboardPage: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  // Filters State
  const [minSalary, setMinSalary] = useState<number>(100000);
  const [remoteOnly, setRemoteOnly] = useState<boolean>(false);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [location, setLocation] = useState<string>('');

  // Selected Job for Application
  const [selectedJobMatch, setSelectedJobMatch] = useState<any>(null);
  const [coverNote, setCoverNote] = useState('');
  const [applying, setApplying] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  const fetchCandidateData = async () => {
    setLoading(true);
    try {
      const prof = await api.candidate.getProfile().catch(() => null);
      setProfile(prof);

      const matchList = await api.candidate.getMatches({
        minSalary: minSalary > 0 ? minSalary : undefined,
        remoteOnly: remoteOnly ? true : undefined,
        minExperience: minExperience > 0 ? minExperience : undefined,
        location: location.trim() ? location.trim() : undefined,
      }).catch(() => []);

      setMatches(matchList);

      const myApps = await api.applications.getMyApplications().catch(() => []);
      setAppliedJobs(new Set(myApps.map((a: any) => a.jobId)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, [minSalary, remoteOnly, minExperience, location]);

  const handleApply = async () => {
    if (!selectedJobMatch) return;
    setApplying(true);
    try {
      await api.applications.apply(selectedJobMatch.job.id, coverNote);
      setAppliedJobs((prev) => new Set(prev).add(selectedJobMatch.job.id));
      setSelectedJobMatch(null);
      setCoverNote('');
    } catch (err: any) {
      alert(err.message || 'Application failed');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Profile Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold font-display text-xl">
              {profile?.fullName ? profile.fullName.charAt(0) : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-display text-white">{profile?.fullName || 'Candidate Portal'}</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  Vector Profile Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {profile?.title || 'Full-Stack Developer'} • {profile?.location || 'Remote'} • {profile?.skills?.length || 0} skills indexed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/candidate/resume"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors border border-slate-700"
            >
              <FileText className="w-4 h-4 text-indigo-400" /> Upload / Update PDF Resume
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hybrid Filter Sidebar */}
          <div className="lg:col-span-3 space-y-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl h-fit sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-400" /> Hybrid Filters
              </h3>
              <button
                onClick={() => {
                  setMinSalary(0);
                  setRemoteOnly(false);
                  setMinExperience(0);
                  setLocation('');
                }}
                className="text-[11px] text-slate-400 hover:text-indigo-400"
              >
                Reset
              </button>
            </div>

            {/* Min Salary Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Min Target Salary</span>
                <span className="font-semibold text-emerald-400">${minSalary.toLocaleString()}/yr</span>
              </div>
              <input
                type="range"
                min={50000}
                max={250000}
                step={5000}
                value={minSalary}
                onChange={(e) => setMinSalary(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Min Experience */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 block">Min Experience Years</label>
              <select
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value={0}>Any Experience</option>
                <option value={2}>2+ Years</option>
                <option value={4}>4+ Years</option>
                <option value={6}>6+ Years</option>
              </select>
            </div>

            {/* Remote Only */}
            <div className="flex items-center justify-between py-2 border-t border-slate-800">
              <span className="text-xs text-slate-300">Remote Jobs Only</span>
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="w-4 h-4 rounded accent-indigo-600"
              />
            </div>

            {/* Location Search */}
            <div className="space-y-1 pt-2 border-t border-slate-800">
              <label className="text-xs text-slate-300 block">Location Search</label>
              <input
                type="text"
                placeholder="San Francisco, CA..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* AI Matches Feed */}
          <div className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-xl text-white">AI-Ranked Job Matches</h2>
                <p className="text-xs text-slate-400">Semantic vector distance + filter criteria aggregation pipeline</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {matches.length} Matches Found
              </span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-40 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse" />
                ))}
              </div>
            ) : matches.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 space-y-3">
                <Briefcase className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold">No matching jobs found for current filter criteria.</p>
                <p className="text-xs text-slate-500">Try adjusting your min salary slider or location preferences.</p>
              </div>
            ) : (
              matches.map((match) => {
                const job = match.job;
                const isApplied = appliedJobs.has(job.id);

                return (
                  <div
                    key={job.id}
                    className="group rounded-2xl border border-slate-800 bg-slate-900 hover:border-indigo-500/40 p-6 shadow-xl transition-all duration-200 space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
                            {job.title}
                          </h3>
                          {job.remote && (
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Remote
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-indigo-400" /> {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {job.location || 'Remote'}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <DollarSign className="w-3.5 h-3.5" /> ${(job.minSalary / 1000).toFixed(0)}k - ${(job.maxSalary / 1000).toFixed(0)}k
                          </span>
                        </div>
                      </div>

                      {/* Score Ring */}
                      <CircularScoreRing score={match.matchScore} size="md" />
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{job.description}</p>

                    {/* Skill Breakdown */}
                    <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 font-semibold mr-1">Matching Skills:</span>
                        {match.matchingSkills?.slice(0, 5).map((skill: string, idx: number) => (
                          <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            ✓ {skill}
                          </span>
                        ))}
                      </div>

                      {isApplied ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4" /> Application Submitted
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedJobMatch(match)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
                        >
                          <Send className="w-3.5 h-3.5" /> One-Click Apply
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Application Modal */}
        {selectedJobMatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-6">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">AI Application Submission</span>
                  <h3 className="text-lg font-bold font-display text-white mt-1">{selectedJobMatch.job.title}</h3>
                  <p className="text-xs text-slate-400">{selectedJobMatch.job.company}</p>
                </div>
                <button
                  onClick={() => setSelectedJobMatch(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
                <CircularScoreRing score={selectedJobMatch.matchScore} size="sm" showLabel={false} />
                <div className="text-xs">
                  <span className="font-semibold text-indigo-300 block">AI Match Score: {selectedJobMatch.matchScore}%</span>
                  <span className="text-slate-400">Semantic similarity score calculated against your candidate profile vector.</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 block">Cover Note / Introduction (Optional)</label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Tell the recruiter why you're a great fit for this role..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedJobMatch(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
