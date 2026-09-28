import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, CheckCircle2, Database, Sparkles, ArrowRight, Zap } from 'lucide-react';

export function DemoScriptRunner({ onSelectAlert, onRetainIncident, onTriggerReflect, onTabChange }) {
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Beat 1 (Before), 2: Beat 2 (Fast-forward Retain), 3: Beat 3 (After - Alert #15), 4: Beat 4 (Reflect Output)
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressCount, setProgressCount] = useState(0);

  const steps = [
    {
      id: 1,
      title: "BEAT 1: Baseline Alert #1 (Before Memory)",
      description: "GOES-18 reports M4.8 solar flare. Agent has no mission memory yet, so it defaults to conservative ESCALATE_SAFE_MODE.",
      badge: "BEFORE MEMORY"
    },
    {
      id: 2,
      title: "BEAT 2: Fast-Forward 15 Incident Resolutions",
      description: "Simulating ground station ops team logging 15 real space weather outcomes (M-flares caused zero S-band degradation). Executing retain().",
      badge: "RETAINING INCIDENTS"
    },
    {
      id: 3,
      title: "BEAT 3: Alert #15 Intake (After Memory Learning)",
      description: "New M5.1 flare signature arrives at GEO-COMM-4. Hindsight RECALL identifies 3 matching past events and downgrades to WATCH_ONLY!",
      badge: "HINDSIGHT LEARNED"
    },
    {
      id: 4,
      title: "BEAT 4: Hindsight reflect() Synthesis",
      description: "Agent autonomously synthesizes operational rule INS-REFLECT-01: 'GEO-COMM-4 S-band withstands M-class flares up to M5.0 with 0 degradation.'",
      badge: "REFLECT ARTIFACT"
    }
  ];

  const handleStartDemo = () => {
    setCurrentStep(1);
    setIsPlaying(true);
    // Step 1: Select Alert #1
    onSelectAlert({
      eventId: "EVT-GOES-DEMO-001",
      timestamp: "2026-09-28T22:30:00Z",
      source: "GOES-XRS",
      flareClass: "M4.8",
      cmeSpeedKmS: 580,
      protonDensityCm3: 15.1,
      bzFieldnT: -6.4,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO",
      description: "GOES-18 XRS reports M4.8 solar flare eruption in Active Region 3842."
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      // Fast forward retain simulation
      let count = 0;
      const interval = setInterval(() => {
        count += 3;
        setProgressCount(count);
        if (count >= 15) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentStep(3);
            onSelectAlert({
              eventId: "EVT-DSCOVR-DEMO-015",
              timestamp: "2026-09-29T04:30:00Z",
              source: "GOES-XRS",
              flareClass: "M5.1",
              cmeSpeedKmS: 620,
              protonDensityCm3: 14.5,
              bzFieldnT: -5.1,
              targetSatellite: "GEO-COMM-4",
              affectedOrbit: "GEO",
              description: "GOES-18 detects M5.1 flare signature directed at GEO-COMM-4 footprint."
            });
          }, 800);
        }
      }, 300);
    } else if (currentStep === 3) {
      setCurrentStep(4);
      onTriggerReflect();
      onTabChange('insights');
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setProgressCount(0);
    onTabChange('console');
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/40 rounded-xl p-4 mb-4 text-xs font-mono shadow-lg shadow-amber-500/5">
      
      {/* Demo Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="font-bold text-slate-100 text-sm">
            GUIDED HINDSIGHT DEMO SCRIPT (60-90s Flow)
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {currentStep === 0 ? (
            <button
              onClick={handleStartDemo}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-black font-bold rounded-lg hover:opacity-90 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              Start Guided Demo
            </button>
          ) : (
            <>
              <button
                onClick={handleNextStep}
                disabled={currentStep === 4}
                className="px-3 py-1.5 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 flex items-center gap-1.5 disabled:opacity-50"
              >
                Next Beat <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleReset}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </>
          )}
        </div>
      </div>

      {/* Step Indicators */}
      {currentStep > 0 && (
        <div className="pt-3 space-y-2">
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isDone = currentStep > step.id;
              return (
                <div
                  key={step.id}
                  className={`p-2 rounded-lg border text-[11px] transition-all ${
                    isActive
                      ? 'bg-amber-950/60 border-amber-500 text-amber-200 font-bold shadow-md shadow-amber-500/20'
                      : isDone
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-950/50 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>STEP 0{step.id}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-[10px] line-clamp-1">{step.badge}</div>
                </div>
              );
            })}
          </div>

          {/* Current Step Banner Narrative */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-200 font-sans">
            <span className="font-mono text-amber-400 font-bold text-xs block mb-1">
              CURRENT DEMO BEAT: {steps[currentStep - 1]?.title}
            </span>
            <p className="text-xs text-slate-300">
              {steps[currentStep - 1]?.description}
            </p>
            {currentStep === 2 && (
              <div className="mt-2 flex items-center gap-2 font-mono text-xs text-cyan-400">
                <Database className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Simulating Ground Station Ops retain(): {progressCount}/15 historical records processed...</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
