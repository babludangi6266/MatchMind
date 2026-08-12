import React, { useState } from 'react';
import { CircularScoreRing } from '../ui/CircularScoreRing';
import { 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ChevronRight, 
  History,
  FileText,
  Building2,
  MapPin,
  Sparkles
} from 'lucide-react';

export interface ApplicationItem {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateTitle: string;
  candidateSkills: string[];
  matchScore: number;
  status: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';
  coverNote?: string;
  auditTrail?: any[];
  appliedAt: string;
}

interface KanbanBoardProps {
  applications: ApplicationItem[];
  onStatusChange: (applicationId: string, newStatus: ApplicationItem['status'], notes?: string) => void;
}

const STAGES: { key: ApplicationItem['status']; label: string; color: string; bg: string; icon: any }[] = [
  { key: 'APPLIED', label: 'Applied', color: 'text-indigo-400', bg: 'border-indigo-500/30 bg-indigo-500/5', icon: Clock },
  { key: 'SCREENING', label: 'Screening', color: 'text-amber-400', bg: 'border-amber-500/30 bg-amber-500/5', icon: UserCheck },
  { key: 'INTERVIEW', label: 'Interview', color: 'text-purple-400', bg: 'border-purple-500/30 bg-purple-500/5', icon: MessageSquare },
  { key: 'OFFER', label: 'Offer Sent', color: 'text-blue-400', bg: 'border-blue-500/30 bg-blue-500/5', icon: CheckCircle2 },
  { key: 'HIRED', label: 'Hired', color: 'text-emerald-400', bg: 'border-emerald-500/30 bg-emerald-500/5', icon: Sparkles },
  { key: 'REJECTED', label: 'Rejected', color: 'text-rose-400', bg: 'border-rose-500/30 bg-rose-500/5', icon: XCircle },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ applications, onStatusChange }) => {
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const StageIcon = stage.icon;
          const stageApps = applications.filter((app) => app.status === stage.key);

          return (
            <div
              key={stage.key}
              className={`rounded-2xl border ${stage.bg} p-3.5 flex flex-col min-h-[500px] backdrop-blur-md`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <StageIcon className={`w-4 h-4 ${stage.color}`} />
                  <span className="font-display font-semibold text-sm text-white">{stage.label}</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  {stageApps.length}
                </span>
              </div>

              {/* Stage Column Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {stageApps.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                    No candidates
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      className="group rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-900 hover:border-indigo-500/40 p-3.5 shadow-lg transition-all duration-200 cursor-pointer space-y-3"
                      onClick={() => setSelectedApp(app)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-sm text-white group-hover:text-indigo-400 transition-colors">
                            {app.candidateName}
                          </h4>
                          <p className="text-xs text-slate-400">{app.candidateTitle}</p>
                        </div>
                        <CircularScoreRing score={app.matchScore} size="sm" showLabel={false} />
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1">
                        {app.candidateSkills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {app.candidateSkills.length > 3 && (
                          <span className="text-[10px] text-slate-500">+{app.candidateSkills.length - 3}</span>
                        )}
                      </div>

                      {/* Stage Move Controls */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApp(app);
                          }}
                          className="flex items-center gap-1 hover:text-indigo-400 transition-colors text-[11px]"
                        >
                          <History className="w-3.5 h-3.5" /> Audit History
                        </button>
                        
                        <div className="flex items-center gap-1">
                          {stage.key !== 'HIRED' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextStageIndex = STAGES.findIndex((s) => s.key === stage.key) + 1;
                                if (nextStageIndex < STAGES.length) {
                                  onStatusChange(app.id, STAGES[nextStageIndex].key);
                                }
                              }}
                              className="p-1 rounded hover:bg-indigo-600/20 text-indigo-400 hover:text-white transition-colors"
                              title="Move to Next Stage"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Audit Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Candidate Application Audit</span>
                <h3 className="text-xl font-bold font-display text-white mt-1">{selectedApp.candidateName}</h3>
                <p className="text-sm text-slate-400">{selectedApp.candidateTitle}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 uppercase">Vector Match Score</span>
                <div className="mt-1">
                  <CircularScoreRing score={selectedApp.matchScore} size="md" />
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase">Current Stage</span>
                <div className="mt-1 font-semibold text-lg text-indigo-400">{selectedApp.status}</div>
                <span className="text-xs text-slate-500 block mt-1">Applied: {new Date(selectedApp.appliedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Audit Trail Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" /> Stage Transition Audit Trail
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedApp.auditTrail && selectedApp.auditTrail.length > 0 ? (
                  selectedApp.auditTrail.map((log, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-300 font-medium">
                        <span>
                          {log.fromStatus ? `${log.fromStatus} → ` : ''}
                          <strong className="text-indigo-400">{log.toStatus}</strong>
                        </span>
                        <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-400">{log.notes}</p>
                      <span className="text-[10px] text-slate-500 block">Changed by: {log.changedByName || 'System'}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">No transition log available.</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Change Candidate Stage:</span>
              <div className="flex items-center gap-2">
                {STAGES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      onStatusChange(selectedApp.id, s.key, `Stage changed to ${s.label} from audit modal`);
                      setSelectedApp(null);
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
                      selectedApp.status === s.key
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
