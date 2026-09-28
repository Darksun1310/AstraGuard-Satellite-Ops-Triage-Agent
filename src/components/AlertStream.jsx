import React, { useState } from 'react';
import { AlertTriangle, Zap, Radio, Globe, Plus, ShieldAlert } from 'lucide-react';

export function AlertStream({ alerts, selectedAlert, onSelectAlert, onAddSimulatedAlert }) {
  const [filterSat, setFilterSat] = useState('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filterSat === 'ALL') return true;
    return a.targetSatellite === filterSat;
  });

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col h-full border border-slate-800">
      
      {/* Stream Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <h2 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wider">
            Live Telemetry Feed
          </h2>
          <span className="bg-cyan-950 text-cyan-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/30">
            {alerts.length} ALERTS
          </span>
        </div>
        
        <button
          onClick={onAddSimulatedAlert}
          className="text-xs font-mono px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 rounded flex items-center gap-1 transition-all"
          title="Inject realistic GOES / DSCOVR flare signature"
        >
          <Plus className="w-3.5 h-3.5" />
          Simulate Alert
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 mb-3 text-[11px] font-mono">
        <span className="text-slate-500 mr-1">Mission:</span>
        {['ALL', 'GEO-COMM-4', 'Sentinel-6', 'NOAA-20'].map(sat => (
          <button
            key={sat}
            onClick={() => setFilterSat(sat)}
            className={`px-2 py-0.5 rounded transition-all ${
              filterSat === sat
                ? 'bg-slate-700 text-cyan-300 font-bold border border-slate-600'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {sat}
          </button>
        ))}
      </div>

      {/* Alert Cards Stream */}
      <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 max-h-[580px]">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-mono text-xs">
            No telemetry alerts match current filter.
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isSelected = selectedAlert && selectedAlert.eventId === alert.eventId;
            const isXClass = alert.flareClass?.startsWith('X');
            const isMClass = alert.flareClass?.startsWith('M');

            return (
              <div
                key={alert.eventId}
                onClick={() => onSelectAlert(alert)}
                className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/80 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                      isXClass
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                        : isMClass
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {alert.flareClass || 'M-CLASS'}
                    </span>
                    <span className="font-mono text-slate-200 font-semibold">{alert.eventId}</span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-slate-300 text-xs line-clamp-2 mb-2 font-sans">
                  {alert.description || `${alert.source} detected ${alert.flareClass} solar event targeting ${alert.targetSatellite}.`}
                </div>

                {/* Telemetry Metrics Bar */}
                <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-slate-800/60 font-mono text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    <span>{alert.targetSatellite}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Radio className="w-3 h-3 text-amber-400" />
                    <span>{alert.cmeSpeedKmS} km/s</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <ShieldAlert className="w-3 h-3 text-purple-400" />
                    <span>Bz: {alert.bzFieldnT}nT</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
