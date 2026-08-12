import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { KanbanBoard, ApplicationItem } from '../components/ats/KanbanBoard';
import { api } from '../services/api';
import { Kanban, Filter, RefreshCw } from 'lucide-react';

export const AtsPipelinePage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobsAndApps = async () => {
    setLoading(true);
    try {
      const myJobs = await api.jobs.getRecruiterJobs().catch(() => []);
      setJobs(myJobs);

      if (myJobs.length > 0) {
        const initialId = selectedJobId || myJobs[0].id;
        setSelectedJobId(initialId);
        const apps = await api.applications.getForJob(initialId).catch(() => []);
        setApplications(apps);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsAndApps();
  }, []);

  const handleJobSelect = async (jobId: string) => {
    setSelectedJobId(jobId);
    setLoading(true);
    try {
      const apps = await api.applications.getForJob(jobId).catch(() => []);
      setApplications(apps);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId: string, newStatus: ApplicationItem['status'], notes?: string) => {
    try {
      const updated = await api.applications.updateStatus(appId, newStatus, notes);
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: updated.status, auditTrail: updated.auditTrail } : app))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update candidate ATS status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Recruitment Pipeline Workflow</span>
            <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
              <Kanban className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> ATS Kanban Pipeline
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Job Filter Selector */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-2xl text-xs shadow-sm font-semibold">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedJobId}
                onChange={(e) => handleJobSelect(e.target.value)}
                className="bg-transparent text-slate-800 dark:text-white font-bold focus:outline-none cursor-pointer"
              >
                {jobs.map((job) => (
                  <option key={job.id} value={job.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
                    {job.title} ({job.company})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchJobsAndApps}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 shadow-sm"
              title="Refresh Pipeline"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Kanban Board */}
        {loading ? (
          <div className="h-96 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 animate-pulse" />
        ) : (
          <KanbanBoard applications={applications} onStatusChange={handleStatusChange} />
        )}
      </main>
    </div>
  );
};
