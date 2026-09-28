import React from 'react';
import { Satellite, Database, Cpu, Sparkles, Activity, ShieldCheck, Play } from 'lucide-react';

export function TelemetryHeader({ activeTab, setActiveTab, memoryStats, onRunDemo }) {
  return (
    <header className="border-b border-slate-800 bg-[#080d1a]/90 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & System Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#060913] rounded-[10px] flex items-center justify-center">
              <Satellite className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white font-mono">
                AstraGuard <span className="text-cyan-400 text-xs font-normal border border-cyan-500/30 px-1.5 py-0.5 rounded bg-cyan-950/40">Hindsight AI</span>
              </h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Satellite Fleet & Space Weather Ops Triage Agent</p>
          </div>
        </div>

        {/* Real-time Telemetry Indicators */}
        <div className="flex items-center gap-4 text-xs font-mono bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 border-r border-slate-800 pr-3">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">GOES-18 XRS:</span>
            <span className="text-amber-300 font-medium">M5.1 Flare</span>
          </div>
          <div className="flex items-center gap-1.5 border-r border-slate-800 pr-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">DSCOVR L1:</span>
            <span className="text-cyan-300 font-medium">620 km/s | Bz -5.1nT</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Hindsight Retain:</span>
            <span className="text-purple-300 font-bold">{memoryStats.totalMemories} events</span>
          </div>
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'console'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Triage Console
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'insights'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-sm shadow-purple-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Reflected Insights ({memoryStats.totalInsights})
          </button>

          <button
            onClick={onRunDemo}
            className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-gradient-to-r from-amber-500 to-rose-500 text-black hover:opacity-90 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 animate-pulse"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            Run 90s Demo Script
          </button>
        </div>

      </div>
    </header>
  );
}
