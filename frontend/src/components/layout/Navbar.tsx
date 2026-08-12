import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  Sparkles, 
  Briefcase, 
  UserCheck, 
  Kanban, 
  BarChart3, 
  FileText, 
  LogOut, 
  Sun, 
  Moon, 
  Bell, 
  ChevronDown 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, theme, toggleTheme } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const isCandidate = user?.role === 'CANDIDATE';
  const isRecruiter = user?.role === 'RECRUITER' || user?.role === 'ADMIN';

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              MatchMind
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                AI Vector
              </span>
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              {isCandidate && (
                <>
                  <Link
                    to="/candidate/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive('/candidate/dashboard') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" /> AI Job Matches
                  </Link>
                  <Link
                    to="/candidate/resume"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive('/candidate/resume') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <FileText className="w-4 h-4" /> Resume Parser
                  </Link>
                </>
              )}

              {isRecruiter && (
                <>
                  <Link
                    to="/recruiter/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive('/recruiter/dashboard') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" /> Job Postings
                  </Link>
                  <Link
                    to="/recruiter/ats"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive('/recruiter/ats') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Kanban className="w-4 h-4" /> ATS Kanban
                  </Link>
                  <Link
                    to="/recruiter/analytics"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive('/recruiter/analytics') ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" /> Recruiter Analytics
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/#features" className="px-3 py-2 text-sm text-slate-300 hover:text-white">Features</Link>
              <Link to="/#architecture" className="px-3 py-2 text-sm text-slate-300 hover:text-white">Architecture</Link>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Real-Time Alerts</h4>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
                        <span className="font-semibold block text-indigo-400">Match Vector Generated</span>
                        Your profile achieved 94.5% match with Lead Frontend Engineer!
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                        <span className="font-semibold block text-emerald-400">ATS Stage Moved</span>
                        Application moved to INTERVIEW stage by Nexus AI.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-white">{user.fullName}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{user.role}</span>
              </div>

              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
