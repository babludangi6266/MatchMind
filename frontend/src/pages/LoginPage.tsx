import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { api } from '../services/api';
import { Sparkles, User, Briefcase, Lock, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <span className="font-display font-bold text-2xl text-white">MatchMind</span>
        </Link>
        <h2 className="text-xl font-semibold text-slate-300">Sign in to your platform account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 space-y-6">
          {/* Quick Demo Instant Buttons */}
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block text-center">Instant Demo One-Click Sign In</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoCandidate}
                className="px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <User className="w-3.5 h-3.5" /> Candidate Demo
              </button>
              <button
                type="button"
                onClick={handleDemoRecruiter}
                className="px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5" /> Recruiter Demo
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
