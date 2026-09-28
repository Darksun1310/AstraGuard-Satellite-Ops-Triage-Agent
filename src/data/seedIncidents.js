/**
 * Seed Historical Incident Dataset for AstraGuard Space Ops Triage Agent
 * Built from GOES XRS (solar flare flux) and DSCOVR (CME & solar wind) event signatures.
 */

export const SEED_INCIDENTS = [
  {
    incidentId: "INC-2024-0102",
    signature: {
      eventId: "EVT-GOES-9821",
      timestamp: "2024-01-15T14:22:00Z",
      source: "GOES-XRS",
      flareClass: "M2.1",
      peakFluxWattsPerM2: 2.1e-5,
      cmeSpeedKmS: 450,
      protonDensityCm3: 8.2,
      bzFieldnT: -3.5,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "MEDIUM",
    recommendedAction: "ESCALATE_SAFE_MODE",
    actualOutcome: {
      subsystemAffected: ["NONE"],
      wasFalseAlarm: true,
      anomalySeverity: "NONE",
      downtimeMinutes: 0,
      opsNotes: "S-band telemetry fully stable during M2.1 flare. Manual escalation was unnecessary."
    },
    resolvedAt: "2024-01-15T16:00:00Z"
  },
  {
    incidentId: "INC-2024-0189",
    signature: {
      eventId: "EVT-DSCOVR-4410",
      timestamp: "2024-02-03T08:11:00Z",
      source: "DSCOVR",
      flareClass: "M5.8",
      peakFluxWattsPerM2: 5.8e-5,
      cmeSpeedKmS: 920,
      protonDensityCm3: 32.1,
      bzFieldnT: -14.8,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "HIGH",
    recommendedAction: "ESCALATE_SAFE_MODE",
    actualOutcome: {
      subsystemAffected: ["X_BAND_COMMS"],
      wasFalseAlarm: false,
      anomalySeverity: "SERVICE_DEGRADATION",
      downtimeMinutes: 45,
      opsNotes: "X-band comms lost lock for 45 mins due to high CME density (32 p/cm³) & negative Bz. S-band stayed locked."
    },
    resolvedAt: "2024-02-03T10:30:00Z"
  },
  {
    incidentId: "INC-2024-0245",
    signature: {
      eventId: "EVT-GOES-9912",
      timestamp: "2024-02-18T21:40:00Z",
      source: "GOES-XRS",
      flareClass: "M3.4",
      peakFluxWattsPerM2: 3.4e-5,
      cmeSpeedKmS: 510,
      protonDensityCm3: 11.0,
      bzFieldnT: -2.1,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "MEDIUM",
    recommendedAction: "WATCH_ONLY",
    actualOutcome: {
      subsystemAffected: ["NONE"],
      wasFalseAlarm: true,
      anomalySeverity: "NONE",
      downtimeMinutes: 0,
      opsNotes: "M3.4 flare with low CME density caused zero RF degradation on S-band or X-band."
    },
    resolvedAt: "2024-02-18T23:00:00Z"
  },
  {
    incidentId: "INC-2024-0312",
    signature: {
      eventId: "EVT-DSCOVR-5012",
      timestamp: "2024-03-09T11:05:00Z",
      source: "DSCOVR",
      flareClass: "X1.1",
      peakFluxWattsPerM2: 1.1e-4,
      cmeSpeedKmS: 1150,
      protonDensityCm3: 41.5,
      bzFieldnT: -18.4,
      targetSatellite: "Sentinel-6",
      affectedOrbit: "LEO"
    },
    initialSeverity: "CRITICAL",
    recommendedAction: "ESCALATE_SAFE_MODE",
    actualOutcome: {
      subsystemAffected: ["STAR_TRACKER", "SOLAR_ARRAY"],
      wasFalseAlarm: false,
      anomalySeverity: "SAFE_HOLD",
      downtimeMinutes: 180,
      opsNotes: "Severe proton event (X1.1) triggered star tracker blind spots. Automated safe hold executed."
    },
    resolvedAt: "2024-03-09T16:30:00Z"
  },
  {
    incidentId: "INC-2024-0399",
    signature: {
      eventId: "EVT-GOES-1004",
      timestamp: "2024-03-22T04:15:00Z",
      source: "GOES-XRS",
      flareClass: "M4.2",
      peakFluxWattsPerM2: 4.2e-5,
      cmeSpeedKmS: 480,
      protonDensityCm3: 9.5,
      bzFieldnT: 1.2,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "MEDIUM",
    recommendedAction: "WATCH_ONLY",
    actualOutcome: {
      subsystemAffected: ["NONE"],
      wasFalseAlarm: true,
      anomalySeverity: "NONE",
      downtimeMinutes: 0,
      opsNotes: "Positive Bz (+1.2 nT) shielded Earth magnetosphere. No operational impact."
    },
    resolvedAt: "2024-03-22T06:00:00Z"
  },
  {
    incidentId: "INC-2024-0480",
    signature: {
      eventId: "EVT-DSCOVR-5301",
      timestamp: "2024-04-11T17:50:00Z",
      source: "DSCOVR",
      flareClass: "M6.7",
      peakFluxWattsPerM2: 6.7e-5,
      cmeSpeedKmS: 880,
      protonDensityCm3: 28.0,
      bzFieldnT: -12.3,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "HIGH",
    recommendedAction: "ESCALATE_SAFE_MODE",
    actualOutcome: {
      subsystemAffected: ["X_BAND_COMMS"],
      wasFalseAlarm: false,
      anomalySeverity: "SERVICE_DEGRADATION",
      downtimeMinutes: 30,
      opsNotes: "X-band experienced bit error spike. S-band telemetry backup maintained full control."
    },
    resolvedAt: "2024-04-11T19:30:00Z"
  },
  {
    incidentId: "INC-2024-0522",
    signature: {
      eventId: "EVT-GOES-1029",
      timestamp: "2024-05-01T12:00:00Z",
      source: "GOES-XRS",
      flareClass: "M1.8",
      peakFluxWattsPerM2: 1.8e-5,
      cmeSpeedKmS: 390,
      protonDensityCm3: 6.0,
      bzFieldnT: -1.0,
      targetSatellite: "NOAA-20",
      affectedOrbit: "LEO"
    },
    initialSeverity: "LOW",
    recommendedAction: "SUPPRESS",
    actualOutcome: {
      subsystemAffected: ["NONE"],
      wasFalseAlarm: false,
      anomalySeverity: "NONE",
      downtimeMinutes: 0,
      opsNotes: "Minor flare, well below threshold for LEO orbital perturbations."
    },
    resolvedAt: "2024-05-01T13:00:00Z"
  },
  {
    incidentId: "INC-2024-0610",
    signature: {
      eventId: "EVT-DSCOVR-5890",
      timestamp: "2024-05-20T03:30:00Z",
      source: "DSCOVR",
      flareClass: "X1.4",
      peakFluxWattsPerM2: 1.4e-4,
      cmeSpeedKmS: 1280,
      protonDensityCm3: 52.0,
      bzFieldnT: -22.5,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "CRITICAL",
    recommendedAction: "ESCALATE_SAFE_MODE",
    actualOutcome: {
      subsystemAffected: ["X_BAND_COMMS", "SOLAR_ARRAY"],
      wasFalseAlarm: false,
      anomalySeverity: "SERVICE_DEGRADATION",
      downtimeMinutes: 110,
      opsNotes: "X-band outage 110 mins. S-band remained locked throughout event."
    },
    resolvedAt: "2024-05-20T07:00:00Z"
  },
  {
    incidentId: "INC-2024-0704",
    signature: {
      eventId: "EVT-GOES-1090",
      timestamp: "2024-06-14T09:12:00Z",
      source: "GOES-XRS",
      flareClass: "M3.9",
      peakFluxWattsPerM2: 3.9e-5,
      cmeSpeedKmS: 540,
      protonDensityCm3: 14.2,
      bzFieldnT: -5.6,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "MEDIUM",
    recommendedAction: "WATCH_ONLY",
    actualOutcome: {
      subsystemAffected: ["NONE"],
      wasFalseAlarm: true,
      anomalySeverity: "NONE",
      downtimeMinutes: 0,
      opsNotes: "S-band tolerant; X-band jitter minor (<2dB). No mission impact."
    },
    resolvedAt: "2024-06-14T11:00:00Z"
  },
  {
    incidentId: "INC-2024-0790",
    signature: {
      eventId: "EVT-DSCOVR-6102",
      timestamp: "2024-07-02T19:44:00Z",
      source: "DSCOVR",
      flareClass: "M7.1",
      peakFluxWattsPerM2: 7.1e-5,
      cmeSpeedKmS: 960,
      protonDensityCm3: 35.0,
      bzFieldnT: -16.0,
      targetSatellite: "NOAA-20",
      affectedOrbit: "LEO"
    },
    initialSeverity: "HIGH",
    recommendedAction: "MANEUVER_PREP",
    actualOutcome: {
      subsystemAffected: ["STAR_TRACKER"],
      wasFalseAlarm: false,
      anomalySeverity: "MINOR_GLITCH",
      downtimeMinutes: 15,
      opsNotes: "LEO thermosphere expansion caused atmospheric drag surge. Altitude boost planned."
    },
    resolvedAt: "2024-07-02T22:00:00Z"
  },
  {
    incidentId: "INC-2024-0855",
    signature: {
      eventId: "EVT-GOES-1145",
      timestamp: "2024-07-25T14:10:00Z",
      source: "GOES-XRS",
      flareClass: "M2.8",
      peakFluxWattsPerM2: 2.8e-5,
      cmeSpeedKmS: 420,
      protonDensityCm3: 7.8,
      bzFieldnT: 2.5,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "LOW",
    recommendedAction: "SUPPRESS",
    actualOutcome: {
      subsystemAffected: ["NONE"],
      wasFalseAlarm: false,
      anomalySeverity: "NONE",
      downtimeMinutes: 0,
      opsNotes: "Positive IMF Bz + low density flare; verified zero telemetry anomaly."
    },
    resolvedAt: "2024-07-25T15:30:00Z"
  },
  {
    incidentId: "INC-2024-0912",
    signature: {
      eventId: "EVT-DSCOVR-6500",
      timestamp: "2024-08-10T06:05:00Z",
      source: "DSCOVR",
      flareClass: "X2.2",
      peakFluxWattsPerM2: 2.2e-4,
      cmeSpeedKmS: 1400,
      protonDensityCm3: 65.0,
      bzFieldnT: -28.0,
      targetSatellite: "Sentinel-6",
      affectedOrbit: "LEO"
    },
    initialSeverity: "CRITICAL",
    recommendedAction: "ESCALATE_SAFE_MODE",
    actualOutcome: {
      subsystemAffected: ["STAR_TRACKER", "S_BAND_TELEMETRY", "X_BAND_COMMS"],
      wasFalseAlarm: false,
      anomalySeverity: "SAFE_HOLD",
      downtimeMinutes: 240,
      opsNotes: "Extreme X2.2 flare & geomagnetic storm. Sat safe-hold active for 4 hours."
    },
    resolvedAt: "2024-08-10T12:00:00Z"
  },
  {
    incidentId: "INC-2024-0988",
    signature: {
      eventId: "EVT-GOES-1201",
      timestamp: "2024-08-28T18:22:00Z",
      source: "GOES-XRS",
      flareClass: "M4.9",
      peakFluxWattsPerM2: 4.9e-5,
      cmeSpeedKmS: 610,
      protonDensityCm3: 16.5,
      bzFieldnT: -7.8,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "MEDIUM",
    recommendedAction: "WATCH_ONLY",
    actualOutcome: {
      subsystemAffected: ["NONE"],
      wasFalseAlarm: true,
      anomalySeverity: "NONE",
      downtimeMinutes: 0,
      opsNotes: "M4.9 flare handled smoothly. S-band robust, X-band within SNR limits."
    },
    resolvedAt: "2024-08-28T20:00:00Z"
  },
  {
    incidentId: "INC-2024-1042",
    signature: {
      eventId: "EVT-DSCOVR-6899",
      timestamp: "2024-09-12T01:50:00Z",
      source: "DSCOVR",
      flareClass: "M8.4",
      peakFluxWattsPerM2: 8.4e-5,
      cmeSpeedKmS: 1020,
      protonDensityCm3: 39.0,
      bzFieldnT: -19.2,
      targetSatellite: "GEO-COMM-4",
      affectedOrbit: "GEO"
    },
    initialSeverity: "HIGH",
    recommendedAction: "ESCALATE_SAFE_MODE",
    actualOutcome: {
      subsystemAffected: ["X_BAND_COMMS"],
      wasFalseAlarm: false,
      anomalySeverity: "SERVICE_DEGRADATION",
      downtimeMinutes: 50,
      opsNotes: "X-band comms degraded. S-band telemetry operational."
    },
    resolvedAt: "2024-09-12T04:00:00Z"
  }
];

/**
 * Scripted Stream of Incoming Live Space Alerts for Demo Evaluation
 */
export const DEMO_ALERT_STREAM = [
  {
    eventId: "EVT-GOES-DEMO-001",
    timestamp: "2026-09-28T22:30:00Z",
    source: "GOES-XRS",
    flareClass: "M4.8",
    peakFluxWattsPerM2: 4.8e-5,
    cmeSpeedKmS: 580,
    protonDensityCm3: 15.1,
    bzFieldnT: -6.4,
    targetSatellite: "GEO-COMM-4",
    affectedOrbit: "GEO",
    description: "GOES-18 XRS reports M4.8 solar flare eruption in Active Region 3842."
  },
  {
    eventId: "EVT-DSCOVR-DEMO-002",
    timestamp: "2026-09-28T23:15:00Z",
    source: "DSCOVR",
    flareClass: "X1.0",
    peakFluxWattsPerM2: 1.0e-4,
    cmeSpeedKmS: 1100,
    protonDensityCm3: 44.0,
    bzFieldnT: -21.0,
    targetSatellite: "Sentinel-6",
    affectedOrbit: "LEO",
    description: "DSCOVR detects fast interplanetary CME shock front with deep negative Bz."
  },
  {
    eventId: "EVT-GOES-DEMO-003",
    timestamp: "2026-09-29T01:00:00Z",
    source: "GOES-XRS",
    flareClass: "M2.4",
    peakFluxWattsPerM2: 2.4e-5,
    cmeSpeedKmS: 410,
    protonDensityCm3: 7.0,
    bzFieldnT: 3.2,
    targetSatellite: "NOAA-20",
    affectedOrbit: "LEO",
    description: "Minor M2.4 flare observed with northward IMF vector."
  },
  {
    eventId: "EVT-DSCOVR-DEMO-015",
    timestamp: "2026-09-29T04:30:00Z",
    source: "GOES-XRS",
    flareClass: "M5.1",
    peakFluxWattsPerM2: 5.1e-5,
    cmeSpeedKmS: 620,
    protonDensityCm3: 14.5,
    bzFieldnT: -5.1,
    targetSatellite: "GEO-COMM-4",
    affectedOrbit: "GEO",
    description: "GOES-18 detects M5.1 flare signature directed at GEO-COMM-4 footprint."
  }
];
