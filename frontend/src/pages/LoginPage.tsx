import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { api } from '../services/api';
import { Sparkles, User, Briefcase, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.auth.login({ email, password });
      setAuth(
        {
          id: res.id,
          email: res.email,
          fullName: res.fullName,
          role: res.role,
          tenantId: res.tenantId,
        },
        res.token
      );
      if (res.role === 'CANDIDATE') {
        navigate('/candidate/dashboard');
      } else {
        navigate('/recruiter/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoCandidate = async () => {
    setEmail('candidate@matchmind.ai');
    setPassword('password');
    setLoading(true);
    try {
      const res = await api.auth.login({ email: 'candidate@matchmind.ai', password: 'password' });
      setAuth(
        {
          id: res.id,
          email: res.email,
          fullName: res.fullName,
          role: res.role,
          tenantId: res.tenantId,
        },
        res.token
      );
      navigate('/candidate/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoRecruiter = async () => {
    setEmail('recruiter@matchmind.ai');
    setPassword('password');
    setLoading(true);
    try {
      const res = await api.auth.login({ email: 'recruiter@matchmind.ai', password: 'password' });
      setAuth(
        {
          id: res.id,
          email: res.email,
          fullName: res.fullName,
          role: res.role,
          tenantId: res.tenantId,
        },
        res.token
      );
      navigate('/recruiter/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-400 p-0.5 shadow-md shadow-indigo-600/10">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <span className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">MatchMind</span>
        </Link>
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300">Sign in to your platform account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 py-8 px-6 shadow-xl rounded-3xl sm:px-10 space-y-6">
          {/* Quick Demo Instant Buttons */}
          <div className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-center">Instant Demo One-Click Sign In</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoCandidate}
                className="px-3.5 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300"
              >
                <User className="w-3.5 h-3.5" /> Candidate Demo
              </button>
              <button
                type="button"
                onClick={handleDemoRecruiter}
                className="px-3.5 py-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200/80 text-teal-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all dark:bg-teal-500/10 dark:border-teal-500/20 dark:text-teal-300"
              >
                <Briefcase className="w-3.5 h-3.5" /> Recruiter Demo
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-500 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-bold">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
