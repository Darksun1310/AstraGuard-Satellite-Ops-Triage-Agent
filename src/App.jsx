import React, { useState, useEffect } from 'react';
import { TelemetryHeader } from './components/TelemetryHeader.jsx';
import { AlertStream } from './components/AlertStream.jsx';
import { TriagePanel } from './components/TriagePanel.jsx';
import { IncidentResolutionModal } from './components/IncidentResolutionModal.jsx';
import { ReflectInsightsView } from './components/ReflectInsightsView.jsx';
import { DemoScriptRunner } from './components/DemoScriptRunner.jsx';
import { hindsightEngine } from './services/hindsightEngine.js';
import { TriageAgent } from './services/triageAgent.js';
import { DEMO_ALERT_STREAM } from './data/seedIncidents.js';

export default function App() {
  const [alerts, setAlerts] = useState(DEMO_ALERT_STREAM);
  const [selectedAlert, setSelectedAlert] = useState(DEMO_ALERT_STREAM[0]);
  const [evaluation, setEvaluation] = useState(null);
  const [activeTab, setActiveTab] = useState('console'); // 'console' | 'insights'
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  
  const [memoryStats, setMemoryStats] = useState(hindsightEngine.getMemoryStats());
  const [insights, setInsights] = useState(hindsightEngine.synthesizedInsights);

  // Evaluate selected alert whenever selectedAlert changes or memory updates
  useEffect(() => {
    if (selectedAlert) {
      const evalResult = TriageAgent.evaluateAlert(selectedAlert);
      setEvaluation(evalResult);
    }
  }, [selectedAlert, memoryStats.totalMemories]);

  // Handle selecting an alert from stream
  const handleSelectAlert = (alert) => {
    setSelectedAlert(alert);
    const evalResult = TriageAgent.evaluateAlert(alert);
    setEvaluation(evalResult);
  };

  // Handle injecting a simulated alert
  const handleAddSimulatedAlert = () => {
    const flareClasses = ['M3.2', 'M6.4', 'X1.2', 'M1.9', 'M8.1'];
    const sats = ['GEO-COMM-4', 'Sentinel-6', 'NOAA-20'];
    const randomFlare = flareClasses[Math.floor(Math.random() * flareClasses.length)];
    const randomSat = sats[Math.floor(Math.random() * sats.length)];

    const newAlert = {
      eventId: `EVT-GOES-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      source: 'GOES-XRS',
      flareClass: randomFlare,
      peakFluxWattsPerM2: 4.5e-5,
      cmeSpeedKmS: Math.floor(400 + Math.random() * 700),
      protonDensityCm3: Math.round((8 + Math.random() * 30) * 10) / 10,
      bzFieldnT: Math.round((-15 + Math.random() * 20) * 10) / 10,
      targetSatellite: randomSat,
      affectedOrbit: randomSat === 'GEO-COMM-4' ? 'GEO' : 'LEO',
      description: `Live simulated GOES-18 telemetry alert: ${randomFlare} flare signature.`
    };

    const updatedAlerts = [newAlert, ...alerts];
    setAlerts(updatedAlerts);
    handleSelectAlert(newAlert);
  };

  // Handle confirming resolution -> Calls RETAIN
  const handleConfirmRetain = (incidentRecord) => {
    hindsightEngine.retain(incidentRecord);
    setIsResolveModalOpen(false);

    // Refresh memory stats & reflected insights
    setMemoryStats(hindsightEngine.getMemoryStats());
    setInsights(hindsightEngine.synthesizedInsights);

    // Re-evaluate selected alert with updated memory
    if (selectedAlert) {
      const updatedEval = TriageAgent.evaluateAlert(selectedAlert);
      setEvaluation(updatedEval);
    }
  };

  // Handle running on-demand REFLECT
  const handleTriggerReflect = () => {
    const freshInsights = hindsightEngine.reflect();
    setInsights([...freshInsights]);
    setMemoryStats(hindsightEngine.getMemoryStats());
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Telemetry Header */}
      <TelemetryHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        memoryStats={memoryStats}
        onRunDemo={() => {
          setActiveTab('console');
        }}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col gap-4">
        
        {/* Guided Demo Script Runner (Top Banner) */}
        <DemoScriptRunner
          onSelectAlert={handleSelectAlert}
          onRetainIncident={handleConfirmRetain}
          onTriggerReflect={handleTriggerReflect}
          onTabChange={setActiveTab}
        />

        {/* Tab 1: Triage Console View */}
        {activeTab === 'console' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-start">
            
            {/* Left Stream Column: 4 Cols */}
            <div className="lg:col-span-4 h-[680px]">
              <AlertStream
                alerts={alerts}
                selectedAlert={selectedAlert}
                onSelectAlert={handleSelectAlert}
                onAddSimulatedAlert={handleAddSimulatedAlert}
              />
            </div>

            {/* Right Main Triage Column: 8 Cols */}
            <div className="lg:col-span-8 h-[680px]">
              <TriagePanel
                evaluation={evaluation}
                onOpenResolveModal={() => setIsResolveModalOpen(true)}
                onEvaluateAlert={handleSelectAlert}
              />
            </div>

          </div>
        )}

        {/* Tab 2: Reflected Insights View */}
        {activeTab === 'insights' && (
          <ReflectInsightsView
            insights={insights}
            onTriggerReflect={handleTriggerReflect}
            lastReflectTime={memoryStats.lastReflectTimestamp}
          />
        )}

      </main>

      {/* Ground Station Operator Resolution Modal (Triggers retain) */}
      {isResolveModalOpen && selectedAlert && (
        <IncidentResolutionModal
          alert={selectedAlert}
          recommendation={evaluation?.recommendation}
          onClose={() => setIsResolveModalOpen(false)}
          onConfirmRetain={handleConfirmRetain}
        />
      )}

      {/* Footer Status Bar */}
      <footer className="border-t border-slate-900 bg-[#04060d] px-4 py-2 text-[11px] font-mono text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>AstraGuard v1.0.0</span>
          <span>•</span>
          <span className="text-cyan-400">Hindsight Engine: ACTIVE</span>
          <span>•</span>
          <span>GOES-XRS / DSCOVR L1 Ingestion Pipeline</span>
        </div>
        <div>
          Memory Store: {memoryStats.totalMemories} incidents retained • {memoryStats.totalInsights} rules reflected
        </div>
      </footer>

    </div>
  );
}
