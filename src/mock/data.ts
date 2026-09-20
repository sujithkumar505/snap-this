// MOCK DATA, not real. This module intentionally contains invented round-number rates.
import type { CandidateConfig, Provider, Region, WorkloadInput } from "@/types";
import { chooseRecommendations, scoreCandidates } from "@/lib/scoring";

const now = "2026-09-20";
const providerStyles: Record<Provider, { service: string; cost: number; carbon: number; performance: number; color: string }> = {
  AWS: { service: "EC2 · t4g.medium", cost: 86, carbon: 33, performance: 84, color: "aws" },
  "Google Cloud": { service: "Compute Engine · e2-standard-2", cost: 78, carbon: 24, performance: 79, color: "gcp" },
  Azure: { service: "Virtual Machines · B2s", cost: 92, carbon: 19, performance: 73, color: "azure" },
};

export function buildCandidates(input: WorkloadInput): CandidateConfig[] {
  const scale = Math.max(0.35, input.cpuCores / 4 + input.ramGb / 32 + input.storageGb / 400 + input.runtimeHours / 24 + input.transferGb / 2000 + input.requestsPerDay / 250000000);
  const regionFactor = { India: 0.92, "US East": 1, "Western Europe": 1.12, "Southeast Asia": 1.04 }[input.region];
  const perfFactor = { Low: 0.88, Standard: 1, High: 1.1, Critical: 1.2 }[input.performanceRequirement];
  const providers = Object.entries(providerStyles) as [Provider, typeof providerStyles[Provider]][];
  return providers.map(([provider, base], index) => {
    const cost = Math.round(base.cost * scale * regionFactor * (input.workloadType === "ml-ai" && provider === "AWS" ? 1.12 : 1));
    const carbon = Math.round(base.carbon * scale * (input.region === "Western Europe" ? 0.88 : 1) * (input.workloadType === "data-processing" && provider === "Azure" ? 0.9 : 1));
    const performance = Math.min(99, Math.round(base.performance * perfFactor + input.cpuCores / 4 + index));
    const compatible = input.workloadType !== "ml-ai" || provider !== "Azure";
    return {
      id: `${provider.toLowerCase().replaceAll(" ", "-")}-${Date.now()}-${index}`,
      provider,
      service: base.service,
      cpuCores: input.cpuCores,
      ramGb: input.ramGb,
      storageGb: input.storageGb,
      runtimeHours: input.runtimeHours,
      region: input.region,
      cost: { value: cost, unit: "USD / month", dataType: "mock", source: "Mock data, not real", retrievedAt: now, methodology: "Invented round-number rates scaled to the workload inputs." },
      carbon: { value: carbon, unit: "kg CO₂e / month", dataType: "mock", source: "Mock data, not real", retrievedAt: now, methodology: "Illustrative intensity factors by provider and region." },
      performance: { value: performance, unit: "score / 100", dataType: "mock", source: "Mock data, not real", retrievedAt: now, methodology: "Illustrative benchmark score based on requested performance." },
      overallScore: 0,
      compatible,
    };
  });
}

export function createAnalysis(input: WorkloadInput, priorities: { cost: number; carbon: number; performance: number }, id = `analysis-${Date.now()}`) {
  const candidates = scoreCandidates(buildCandidates(input), priorities);
  const providerBest = Object.fromEntries((Object.keys(providerStyles) as Provider[]).map((provider) => {
    const best = candidates.filter((candidate) => candidate.provider === provider && candidate.compatible).sort((a, b) => b.overallScore - a.overallScore)[0];
    return [provider, best?.id ?? null];
  })) as Record<Provider, string | null>;
  return {
    id,
    createdAt: new Date().toISOString(),
    input,
    priorities,
    candidates,
    providerBest,
    recommendations: chooseRecommendations(candidates.filter((candidate) => candidate.compatible)),
    warnings: ["Figures are placeholders for testing the interface, not real prices or emissions."],
    dataMode: "mock" as const,
  };
}
