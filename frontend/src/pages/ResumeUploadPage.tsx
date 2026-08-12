import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { api } from '../services/api';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

export const ResumeUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parsedProfile, setParsedProfile] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const res = await api.candidate.uploadResume(file);
      setParsedProfile(res);
    } catch (err: any) {
      setError(err.message || 'Failed to parse PDF resume');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Apache PDFBox Resume Extraction Engine
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Resume AI Parser & Embedder</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Upload your resume PDF. MatchMind extracts unstructured text, identifies technical skills, and maps your profile into semantic vector space.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-4 hover:border-indigo-400 transition-colors shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <label className="cursor-pointer font-bold text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
              <span>Click to select PDF resume</span>
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            </label>
            <p className="text-xs text-slate-400 mt-1">Supports PDF files up to 10MB</p>
          </div>

          {file && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {file.name} ({Math.round(file.size / 1024)} KB)
            </div>
          )}

          {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}

          <div>
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all inline-flex items-center gap-2"
            >
              {uploading ? 'Extracting & Generating Vectors...' : 'Parse & Generate Embeddings'} <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Parsed Result Display */}
        {parsedProfile && (
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Parsed Profile Vector Generated</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20 font-bold">
                Vector Dimension: {parsedProfile.embedding?.length || 64}-D
              </span>
            </div>

            {/* Extracted Skills */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Automated Skill Tags Identified</span>
              <div className="flex flex-wrap gap-2">
                {parsedProfile.skills?.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-semibold dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Raw Text Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Raw Text Extracted (Apache PDFBox)</span>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 max-h-48 overflow-y-auto leading-relaxed">
                {parsedProfile.rawResumeText}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href="/candidate/dashboard"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 inline-flex items-center gap-2"
              >
                View AI Job Matches <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
