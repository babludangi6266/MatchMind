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
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, theme, toggleTheme } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCandidate = user?.role === 'CANDIDATE';
  const isRecruiter = user?.role === 'RECRUITER' || user?.role === 'ADMIN';

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-teal-400 p-0.5 shadow-md shadow-indigo-500/15 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              MatchMind
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20 shadow-sm">
                AI Vector ATS
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
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      isActive('/candidate/dashboard') 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" /> AI Job Matches
                  </Link>
                  <Link
                    to="/candidate/resume"
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      isActive('/candidate/resume') 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <FileText className="w-4 h-4" /> Resume AI Parser
                  </Link>
                </>
              )}

              {isRecruiter && (
                <>
                  <Link
                    to="/recruiter/dashboard"
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      isActive('/recruiter/dashboard') 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" /> Job Postings
                  </Link>
                  <Link
                    to="/recruiter/ats"
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      isActive('/recruiter/ats') 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <Kanban className="w-4 h-4" /> ATS Kanban
                  </Link>
                  <Link
                    to="/recruiter/analytics"
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      isActive('/recruiter/analytics') 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" /> Recruiter Analytics
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <a href="/#features" className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white transition-colors">Features</a>
              <a href="/#architecture" className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white transition-colors">Architecture Defense</a>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white transition-colors border border-slate-200/80 dark:border-slate-800 shadow-sm"
            title="Toggle Light / Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white relative border border-slate-200/80 dark:border-slate-800 shadow-sm"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Real-Time Alerts</h4>
                    <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-slate-800 text-xs dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-200 space-y-1">
                      <span className="font-bold block text-indigo-700 dark:text-indigo-400">Match Vector Calculated</span>
                      Your candidate embedding achieved 95.8% semantic similarity!
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">{user.fullName}</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-extrabold tracking-wider">{user.role}</span>
              </div>

              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-slate-200/80 dark:border-slate-800 shadow-sm"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
          {user ? (
            <>
              {isCandidate && (
                <>
                  <Link to="/candidate/dashboard" className="block px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200">AI Job Matches</Link>
                  <Link to="/candidate/resume" className="block px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200">Resume AI Parser</Link>
                </>
              )}
              {isRecruiter && (
                <>
                  <Link to="/recruiter/dashboard" className="block px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200">Job Postings</Link>
                  <Link to="/recruiter/ats" className="block px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200">ATS Kanban</Link>
                  <Link to="/recruiter/analytics" className="block px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200">Recruiter Analytics</Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200">Sign In</Link>
              <Link to="/register" className="block px-4 py-2 text-xs font-bold text-indigo-600 font-extrabold">Register Account</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
