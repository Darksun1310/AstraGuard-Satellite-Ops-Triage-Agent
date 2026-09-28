import React from 'react';
import { Sparkles, Brain, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw, FileText } from 'lucide-react';

export function ReflectInsightsView({ insights, onTriggerReflect, lastReflectTime }) {
  return (
    <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-6 max-w-5xl mx-auto my-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-950">
            <Sparkles className="w-6 h-6 text-purple-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
              Hindsight <span className="text-purple-400">reflect()</span> Operational Knowledge Base
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Autonomous space-weather operational pattern synthesis from retained ground-station outcomes
            </p>
          </div>
        </div>

        <button
          onClick={onTriggerReflect}
          className="px-4 py-2 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/50 text-purple-200 text-xs font-mono font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-purple-300" />
          Run Hindsight reflect() Synthesis
        </button>
      </div>

      {/* Insights Cards List */}
      <div className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            No reflected insights synthesized yet. Process more incidents to generate operational rules.
          </div>
        ) : (
          insights.map(insight => (
            <div
              key={insight.insightId}
              className="bg-slate-900/90 border border-purple-900/60 hover:border-purple-500/60 rounded-xl p-5 transition-all shadow-lg shadow-purple-950/20 space-y-3"
            >
              {/* Insight ID & Topic */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="font-mono text-xs font-bold text-slate-300">{insight.insightId}</span>
                  <span className="text-xs font-bold text-cyan-300 font-sans">{insight.topic}</span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-slate-400 text-[10px]">CONFIDENCE:</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                    {Math.round(insight.confidenceScore * 100)}%
                  </span>
                </div>
              </div>

              {/* Rule Statement */}
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-slate-200 font-sans text-xs leading-relaxed">
                <span className="font-mono text-purple-400 font-bold block mb-1">SYNTHESIZED RULE STATEMENT:</span>
                "{insight.ruleStatement}"
              </div>

              {/* Policy Adjustment Recommendation */}
              <div className="bg-purple-950/30 p-3 rounded-lg border border-purple-800/40 text-xs font-mono text-purple-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-purple-300">TRIAGE POLICY ADJUSTMENT: </span>
                  {insight.recommendationAdjustment}
                </div>
              </div>

              {/* Supporting Evidence Citation Pills */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500">Supporting Retained Incident Evidence:</span>
                  {insight.supportingIncidentIds.map(incId => (
                    <span key={incId} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {incId}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500">
                  Synthesized {new Date(insight.createdAt).toLocaleTimeString()}
                </span>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
