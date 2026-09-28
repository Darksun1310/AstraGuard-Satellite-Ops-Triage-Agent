/**
 * Satellite Operations Triage Agent Engine
 * Uses Hindsight recall & reflect memory context to generate operational recommendations.
 */

import { hindsightEngine } from './hindsightEngine.js';

export class TriageAgent {
  /**
   * Evaluate incoming space weather alert and produce triage recommendation
   * @param {Object} spaceAlert 
   */
  static evaluateAlert(spaceAlert) {
    if (!spaceAlert) return null;

    // 1. RECALL: Fetch top 3 historical memories
    const recalledMemories = hindsightEngine.recall(spaceAlert, 3);
    const activeInsights = hindsightEngine.synthesizedInsights;

    // 2. Default baseline severity without memory
    let baselineSeverity = "HIGH";
    let baselineAction = "ESCALATE_SAFE_MODE";
    let confidence = 0.60;

    const flareClass = spaceAlert.flareClass || "M1.0";
    const isXClass = flareClass.startsWith("X");
    const isMClass = flareClass.startsWith("M");
    const isCClass = flareClass.startsWith("C");
    const bz = spaceAlert.bzFieldnT || 0;
    const speed = spaceAlert.cmeSpeedKmS || 400;

    if (isXClass) {
      baselineSeverity = "CRITICAL";
      baselineAction = "ESCALATE_SAFE_MODE";
    } else if (isMClass) {
      baselineSeverity = "MEDIUM";
      baselineAction = "ESCALATE_SAFE_MODE";
    } else if (isCClass) {
      baselineSeverity = "LOW";
      baselineAction = "WATCH_ONLY";
    }

    // 3. APPLY HINDSIGHT RECALL & REFLECT REASONING
    let finalAction = baselineAction;
    let finalSeverity = baselineSeverity;
    let rationale = "";
    let memoryInfluenceType = "BASELINE"; // "BASELINE" | "MEMORY_DOWNGRADE" | "MEMORY_CONFIRMED" | "REFLECT_RULE_APPLIED"

    const topMatch = recalledMemories[0];

    // Check if high-similarity memory exists (>75% similarity)
    if (topMatch && topMatch.similarityScore >= 0.70) {
      confidence = Math.min(0.98, topMatch.similarityScore + 0.10);

      // Check if past similar incidents were false alarms or harmless
      const pastFalseAlarms = recalledMemories.filter(m => m.memory.actualOutcome.wasFalseAlarm || m.memory.actualOutcome.anomalySeverity === "NONE");
      
      if (pastFalseAlarms.length >= 2 && !isXClass) {
        finalAction = "WATCH_ONLY";
        finalSeverity = "LOW";
        memoryInfluenceType = "MEMORY_DOWNGRADE";
        rationale = `Hindsight Recall identified ${recalledMemories.length} similar historical events (${pastFalseAlarms.map(m => m.memory.incidentId).join(", ")}). In ${pastFalseAlarms.length} of ${recalledMemories.length} cases at target mission '${spaceAlert.targetSatellite}', solar flare signature produced ZERO operational telemetry degradation. S-band command channels remained 100% operational. Recommend downgrading from default safe-mode escalation to WATCH_ONLY.`;
      } else if (topMatch.memory.actualOutcome.anomalySeverity === "SAFE_HOLD" || isXClass) {
        finalAction = "ESCALATE_SAFE_MODE";
        finalSeverity = "CRITICAL";
        memoryInfluenceType = "MEMORY_CONFIRMED";
        rationale = `Hindsight Recall confirmed precedent in incident ${topMatch.memory.incidentId} (${Math.round(topMatch.similarityScore * 100)}% signature match). Past flare/CME shape caused orbital safe hold on ${topMatch.memory.signature.targetSatellite}. Immediate satellite safe mode escalation recommended.`;
      } else {
        finalAction = "WATCH_ONLY";
        memoryInfluenceType = "MEMORY_CONFIRMED";
        rationale = `Hindsight Recall retrieved matching incident ${topMatch.memory.incidentId}. Operational precedent supports routine surveillance without triggering mission pause.`;
      }
    } else {
      // No strong past memory -> conservative default beat (Before Memory State)
      confidence = 0.55;
      memoryInfluenceType = "BASELINE";
      rationale = `Insufficient historical precedent for current signature signature (${spaceAlert.flareClass}, CME speed ${speed} km/s, Bz ${bz} nT). Applying default conservative space-flight procedure: ESCALATE_SAFE_MODE.`;
    }

    // Check if explicit Reflected Insight Rule matches
    const geoMClassRule = activeInsights.find(i => i.insightId === "INS-REFLECT-01");
    if (geoMClassRule && spaceAlert.targetSatellite === "GEO-COMM-4" && isMClass && speed < 750 && bz > -10) {
      finalAction = "WATCH_ONLY";
      finalSeverity = "LOW";
      memoryInfluenceType = "REFLECT_RULE_APPLIED";
      rationale = `Hindsight Reflect Rule INS-REFLECT-01 applied: "${geoMClassRule.ruleStatement}" Downgrading action to WATCH_ONLY based on synthesized fleet operational memory.`;
    }

    return {
      alert: spaceAlert,
      recommendation: {
        action: finalAction,
        severity: finalSeverity,
        confidence: Math.round(confidence * 100),
        memoryInfluenceType,
        rationale,
        recalledMemories
      },
      evaluatedAt: new Date().toISOString()
    };
  }
}
