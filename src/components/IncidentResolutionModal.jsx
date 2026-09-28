import React, { useState } from 'react';
import { X, Database, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';

export function IncidentResolutionModal({ alert, recommendation, onClose, onConfirmRetain }) {
  if (!alert) return null;

  const [wasFalseAlarm, setWasFalseAlarm] = useState(true);
  const [anomalySeverity, setAnomalySeverity] = useState('NONE');
  const [subsystemAffected, setSubsystemAffected] = useState([]);
  const [opsNotes, setOpsNotes] = useState(
    `S-band telemetry remained 100% stable during ${alert.flareClass || 'M-class'} flare. No mission disruption reported.`
  );

  const toggleSubsystem = (sub) => {
    if (subsystemAffected.includes(sub)) {
      setSubsystemAffected(subsystemAffected.filter(s => s !== sub));
    } else {
      setSubsystemAffected([...subsystemAffected, sub]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const incidentRecord = {
      incidentId: `INC-${Date.now().toString().slice(-6)}`,
      signature: alert,
      initialSeverity: recommendation?.severity || 'MEDIUM',
      recommendedAction: recommendation?.action || 'WATCH_ONLY',
      actualOutcome: {
        subsystemAffected,
        wasFalseAlarm,
        anomalySeverity,
        downtimeMinutes: wasFalseAlarm ? 0 : 30,
        opsNotes
      },
      resolvedAt: new Date().toISOString()
    };

    onConfirmRetain(incidentRecord);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel-glow max-w-lg w-full rounded-2xl p-6 border border-purple-500/40 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 bg-purple-950 rounded-xl border border-purple-500/40 text-purple-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-mono">
              Ops Feedback & Hindsight <span className="text-purple-400">retain()</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Store ground-station resolution outcome to memory store
            </p>
          </div>
        </div>

        {/* Event Summary */}
        <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 text-xs font-mono space-y-1 mb-4 text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">EVENT ID:</span>
            <span className="text-cyan-400 font-bold">{alert.eventId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">TARGET SAT:</span>
            <span>{alert.targetSatellite} ({alert.affectedOrbit})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">SIGNATURE:</span>
            <span className="text-amber-400">{alert.flareClass} Flare • CME {alert.cmeSpeedKmS}km/s</span>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          
          {/* False Alarm Toggle */}
          <div>
            <label className="block text-slate-300 font-mono text-xs mb-1.5 font-semibold">
              WAS THIS A FALSE ALARM FOR MISSION IMPACT?
            </label>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <button
                type="button"
                onClick={() => {
                  setWasFalseAlarm(true);
                  setAnomalySeverity('NONE');
                  setSubsystemAffected([]);
                }}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  wasFalseAlarm
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                YES (FALSE ALARM / STABLE)
              </button>

              <button
                type="button"
                onClick={() => {
                  setWasFalseAlarm(false);
                  setAnomalySeverity('SERVICE_DEGRADATION');
                }}
                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  !wasFalseAlarm
                    ? 'bg-rose-950 text-rose-300 border-rose-500 shadow-md shadow-rose-500/20'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                NO (ACTUAL ANOMALY)
              </button>
            </div>
          </div>

          {/* Subsystems Affected Checkboxes */}
          <div>
            <label className="block text-slate-300 font-mono text-xs mb-1.5 font-semibold">
              SUBSYSTEMS AFFECTED
            </label>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {['X_BAND_COMMS', 'S_BAND_TELEMETRY', 'STAR_TRACKER', 'SOLAR_ARRAY'].map(sub => {
                const isSelected = subsystemAffected.includes(sub);
                return (
                  <button
                    type="button"
                    key={sub}
                    onClick={() => toggleSubsystem(sub)}
                    className={`px-2.5 py-1 rounded border transition-all ${
                      isSelected
                        ? 'bg-purple-950 text-purple-300 border-purple-500 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ops Notes */}
          <div>
            <label className="block text-slate-300 font-mono text-xs mb-1.5 font-semibold">
              GROUND STATION LOG NOTES
            </label>
            <textarea
              value={opsNotes}
              onChange={(e) => setOpsNotes(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none focus:border-purple-500 font-sans resize-none"
              placeholder="Enter ops notes regarding telemetry resilience..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              Retain Incident & Trigger Reflection
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
