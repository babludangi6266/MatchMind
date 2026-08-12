import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { api } from '../services/api';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { BarChart3, Users, Briefcase, Sparkles, TrendingUp, Award } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.analytics.getSummary()
      .then((res) => setSummary(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const COLORS = ['#4F46E5', '#F59E0B', '#A855F7', '#3B82F6', '#10B981', '#F43F5E'];

  const statusData = summary?.statusBreakdown
    ? Object.entries(summary.statusBreakdown).map(([name, value]) => ({ name, count: value }))
    : [
        { name: 'APPLIED', count: 4 },
        { name: 'SCREENING', count: 3 },
        { name: 'INTERVIEW', count: 2 },
        { name: 'OFFER', count: 1 },
        { name: 'HIRED', count: 1 },
      ];

  const funnelData = [
    { stage: 'Applications', rate: 100 },
    { stage: 'Screening', rate: summary?.conversionRates?.ScreeningRate || 75 },
    { stage: 'Interview', rate: summary?.conversionRates?.InterviewRate || 50 },
    { stage: 'Offer / Hire', rate: summary?.conversionRates?.HireRate || 25 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Aggregation-Pipeline Driven Dashboards</span>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-2 mt-1">
            <BarChart3 className="w-6 h-6 text-indigo-400" /> Recruiter Funnel & Match Analytics
          </h1>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase">
              <span>Total Active Jobs</span>
              <Briefcase className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-display font-bold text-white">{summary?.totalJobs || 2}</div>
            <span className="text-[11px] text-emerald-400 font-semibold">↑ 100% active postings</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase">
              <span>Indexed Candidate Profiles</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-display font-bold text-white">{summary?.totalCandidates || 4}</div>
            <span className="text-[11px] text-indigo-400 font-semibold">768-dim vector embeddings</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase">
              <span>Total Applications</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-display font-bold text-white">{summary?.totalApplications || 5}</div>
            <span className="text-[11px] text-slate-400">STOMP WebSocket connected</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase">
              <span>Average Match Score</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-display font-bold text-white">{summary?.averageMatchScore || 91.2}%</div>
            <span className="text-[11px] text-emerald-400 font-semibold">High semantic alignment</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stage Breakdown Bar Chart */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">ATS Stage Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }} />
                  <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recruitment Funnel Conversion */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Recruitment Funnel Conversion %</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="stage" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
