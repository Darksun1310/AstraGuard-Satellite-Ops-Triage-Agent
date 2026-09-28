import React from 'react';
import { Database, CheckCircle2, AlertOctagon, Info, ArrowUpRight } from 'lucide-react';

export function MemoryRecallCard({ recallResult }) {
  if (!recallResult) return null;

  const { memory, similarityScore, matchReason } = recallResult;
  const matchPercentage = Math.round(similarityScore * 100);
  const outcome = memory.actualOutcome || {};

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-lg p-3 text-xs shadow-md transition-all hover:border-purple-500/50">
      
      {/* Header: ID, Match Score, Match Reason */}
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-mono font-bold text-slate-200">{memory.incidentId}</span>
          <span className="text-[10px] font-mono text-slate-400">({memory.signature.flareClass || 'M-class'})</span>
        </div>

        <div className="flex items-center gap-1">
          <span className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
            matchPercentage >= 85
              ? 'bg-purple-950 text-purple-300 border border-purple-500/50 glow-purple'
              : 'bg-slate-800 text-slate-300'
          }`}>
            {matchPercentage}% MATCH
          </span>
        </div>
      </div>

      {/* Match Reason Tag */}
      <div className="text-[10px] font-mono text-purple-300 mb-2 flex items-center gap-1 bg-purple-950/40 px-2 py-1 rounded border border-purple-900/50">
        <Info className="w-3 h-3 text-purple-400 shrink-0" />
        <span>{matchReason}</span>
      </div>

      {/* Historical Outcome & Lesson Learned */}
      <div className="space-y-1 font-sans text-slate-300">
        <div className="flex items-start gap-1.5 text-xs">
          {outcome.wasFalseAlarm ? (
            <span className="inline-flex items-center text-amber-400 text-[10px] font-mono bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
              FALSE ALARM
            </span>
          ) : outcome.anomalySeverity === 'SAFE_HOLD' ? (
            <span className="inline-flex items-center text-rose-400 text-[10px] font-mono bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-500/30">
              SAFE HOLD EXECUTED
            </span>
          ) : (
            <span className="inline-flex items-center text-emerald-400 text-[10px] font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              MINOR GLITCH / STABLE
            </span>
          )}

          <p className="flex-1 text-[11px] leading-tight text-slate-300">
            {outcome.opsNotes}
          </p>
        </div>

        {/* Affected Subsystems */}
        {outcome.subsystemAffected && outcome.subsystemAffected.length > 0 && (
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 pt-1">
            <span>Affected:</span>
            {outcome.subsystemAffected.map(sub => (
              <span key={sub} className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                {sub}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
