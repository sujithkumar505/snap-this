import { describe, expect, it } from "vitest";
import { chooseRecommendations, scoreCandidates } from "@/lib/scoring";
import type { CandidateConfig } from "@/types";

const candidates: CandidateConfig[] = [
  { id: "aws", provider: "AWS", service: "x", cpuCores: 1, ramGb: 1, storageGb: 10, runtimeHours: 1, region: "India", cost: { value: 100, unit: "USD", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, carbon: { value: 30, unit: "kg", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, performance: { value: 70, unit: "score", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, overallScore: 0, compatible: true },
  { id: "gcp", provider: "Google Cloud", service: "x", cpuCores: 1, ramGb: 1, storageGb: 10, runtimeHours: 1, region: "India", cost: { value: 120, unit: "USD", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, carbon: { value: 20, unit: "kg", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, performance: { value: 80, unit: "score", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, overallScore: 0, compatible: true },
  { id: "azure", provider: "Azure", service: "x", cpuCores: 1, ramGb: 1, storageGb: 10, runtimeHours: 1, region: "India", cost: { value: 110, unit: "USD", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, carbon: { value: 25, unit: "kg", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, performance: { value: 60, unit: "score", dataType: "mock", source: "Mock data, not real", retrievedAt: "2026-09-20" }, overallScore: 0, compatible: true },
];

describe("scoring", () => {
  it("normalizes and scores the documented example", () => {
    const scored = scoreCandidates(candidates, { cost: 50, carbon: 30, performance: 20 });
    expect(scored.map((candidate) => candidate.overallScore)).toEqual([60, 50, 40]);
  });
  it("changes the balanced recommendation as priorities change", () => {
    const carbonFirst = chooseRecommendations(scoreCandidates(candidates, { cost: 20, carbon: 60, performance: 20 }));
    const performanceFirst = chooseRecommendations(scoreCandidates(candidates, { cost: 20, carbon: 20, performance: 60 }));
    expect(carbonFirst.balanced).toBe("gcp");
    expect(performanceFirst.balanced).toBe("gcp");
    expect(carbonFirst.lowerCost).toBe("aws");
    expect(carbonFirst.lowerCarbon).toBe("gcp");
  });
});
