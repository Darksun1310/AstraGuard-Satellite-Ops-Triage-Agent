import React from 'react';
import { ShieldCheck, ShieldAlert, Cpu, Database, CheckCircle, ArrowRight, Zap, RefreshCw, AlertTriangle } from 'lucide-react';
import { MemoryRecallCard } from './MemoryRecallCard.jsx';

export function TriagePanel({ evaluation, onOpenResolveModal, onEvaluateAlert }) {
  if (!evaluation) {
    return (
      <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center h-full border border-slate-800 text-slate-500 font-mono text-sm">
        <Cpu className="w-10 h-10 text-slate-700 animate-pulse mb-3" />
        <p>Select a space weather alert from the left stream to inspect Hindsight AI triage evaluation.</p>
      </div>
    );
  }

  const { alert, recommendation, evaluatedAt } = evaluation;
  const { action, severity, confidence, memoryInfluenceType, rationale, recalledMemories } = recommendation;

  const isDowngraded = memoryInfluenceType === 'MEMORY_DOWNGRADE' || memoryInfluenceType === 'REFLECT_RULE_APPLIED';

  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col h-full border border-slate-800 space-y-4 overflow-y-auto">
      
      {/* 1. Target Satellite & Signature Banner */}
      <div className="bg-slate-900/90 rounded-lg p-3.5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              {alert.targetSatellite} ({alert.affectedOrbit})
            </span>
            <span className="text-xs font-mono text-slate-400">{alert.eventId}</span>
          </div>
          <h2 className="text-base font-bold text-slate-100 mt-1 font-sans">
            {alert.description || `${alert.source} Space Event Observation`}
          </h2>
        </div>

        {/* Telemetry Metrics Badge Matrix */}
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
          <div className="bg-slate-950 px-2 py-1 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500">FLARE</div>
            <div className="font-bold text-amber-400">{alert.flareClass || 'M1.0'}</div>
          </div>
          <div className="bg-slate-950 px-2 py-1 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500">CME SPEED</div>
            <div className="font-bold text-cyan-300">{alert.cmeSpeedKmS} km/s</div>
          </div>
          <div className="bg-slate-950 px-2 py-1 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500">PROTON DENSITY</div>
            <div className="font-bold text-purple-300">{alert.protonDensityCm3} p/cm³</div>
          </div>
          <div className="bg-slate-950 px-2 py-1 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500">IMF BZ</div>
            <div className={`font-bold ${alert.bzFieldnT < -10 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {alert.bzFieldnT} nT
            </div>
          </div>
        </div>
      </div>

      {/* 2. Agent Triage Recommendation Box */}
      <div className={`rounded-xl p-4 border transition-all ${
        isDowngraded
          ? 'bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
          : action === 'ESCALATE_SAFE_MODE'
          ? 'bg-rose-950/40 border-rose-500/60'
          : 'bg-slate-900/80 border-slate-700'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Hindsight Triage Recommendation
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-md text-sm font-mono font-bold tracking-wide shadow-md ${
                action === 'WATCH_ONLY'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 glow-emerald'
                  : action === 'ESCALATE_SAFE_MODE'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 glow-rose'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/50 glow-amber'
              }`}>
                {action}
              </span>

              {isDowngraded && (
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40 flex items-center gap-1 animate-pulse">
                  <Database className="w-3.5 h-3.5 text-purple-400" />
                  HINDSIGHT PREVENTED SAFE-MODE
                </span>
              )}
            </div>
          </div>

          {/* Confidence Score Bar */}
          <div className="bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800 text-right min-w-[120px]">
            <div className="text-[10px] font-mono text-slate-400">DECISION CONFIDENCE</div>
            <div className="text-lg font-mono font-bold text-cyan-400">{confidence}%</div>
          </div>
        </div>

        {/* Rationale Narrative */}
        <div className="text-xs text-slate-200 font-sans leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
          <p className="font-mono text-cyan-300 text-[11px] mb-1 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            AGENT REASONING & MEMORY JUSTIFICATION:
          </p>
          <p>{rationale}</p>
        </div>
      </div>

      {/* 3. Recalled Historical Memories Section (Hindsight RECALL) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" />
            <h3 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
              Recalled Historical Memories ({recalledMemories.length})
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Hindsight vector & event-shape recall
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {recalledMemories.map((recall, index) => (
            <MemoryRecallCard key={recall.memory.incidentId || index} recallResult={recall} />
          ))}
        </div>
      </div>

      {/* 4. Operations Action Bar (Triggers RETAIN) */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Evaluated at {new Date(evaluatedAt).toLocaleTimeString()}</span>
        </div>

        <button
          onClick={() => onOpenResolveModal(alert, recommendation)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-mono font-bold rounded-lg shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Confirm Outcome & Execute retain()
        </button>
      </div>

    </div>
  );
}
