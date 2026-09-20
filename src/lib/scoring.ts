import type { CandidateConfig, Priorities } from "@/types";

export function norm(value: number, min: number, max: number) {
  return max === min ? 0 : (value - min) / (max - min);
}

export function scoreCandidates(candidates: CandidateConfig[], priorities: Priorities) {
  const costs = candidates.map((candidate) => candidate.cost.value);
  const carbons = candidates.map((candidate) => candidate.carbon.value);
  const performances = candidates.map((candidate) => candidate.performance.value);
  const minCost = Math.min(...costs);
  const maxCost = Math.max(...costs);
  const minCarbon = Math.min(...carbons);
  const maxCarbon = Math.max(...carbons);
  const minPerformance = Math.min(...performances);
  const maxPerformance = Math.max(...performances);

  return candidates.map((candidate) => ({
    ...candidate,
    overallScore: 100 * (
      (priorities.cost / 100) * (1 - norm(candidate.cost.value, minCost, maxCost)) +
      (priorities.carbon / 100) * (1 - norm(candidate.carbon.value, minCarbon, maxCarbon)) +
      (priorities.performance / 100) * norm(candidate.performance.value, minPerformance, maxPerformance)
    ),
  }));
}

export function chooseRecommendations(candidates: CandidateConfig[]) {
  const sortedBalanced = [...candidates].sort((a, b) =>
    b.overallScore - a.overallScore || a.cost.value - b.cost.value || a.carbon.value - b.carbon.value || a.id.localeCompare(b.id),
  );
  const lowerCost = [...candidates].sort((a, b) => a.cost.value - b.cost.value || a.carbon.value - b.carbon.value || a.id.localeCompare(b.id))[0];
  const lowerCarbon = [...candidates].sort((a, b) => a.carbon.value - b.carbon.value || a.cost.value - b.cost.value || a.id.localeCompare(b.id))[0];
  return {
    lowerCost: lowerCost?.id ?? "",
    lowerCarbon: lowerCarbon?.id ?? "",
    balanced: sortedBalanced[0]?.id ?? "",
  };
}
