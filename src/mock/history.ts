// MOCK DATA, not real. Local-only history adapter for the demo experience.
import { createAnalysis } from "./data";
import type { AnalysisResult } from "@/types";

const STORAGE_KEY = "cloud-carbon-optimizer-history";
export interface HistoryStore { list(): AnalysisResult[]; save(analysis: AnalysisResult): void; remove(id: string): void; clear(): void; }

const demos: AnalysisResult[] = [
  createAnalysis({ workloadType: "web-app", cpuCores: 4, ramGb: 16, storageGb: 100, runtimeHours: 8, transferGb: 20, requestsPerDay: 0, region: "India", performanceRequirement: "Standard" }, { cost: 50, carbon: 30, performance: 20 }, "demo-web-india"),
  createAnalysis({ workloadType: "api", cpuCores: 8, ramGb: 32, storageGb: 250, runtimeHours: 24, transferGb: 120, requestsPerDay: 8000000, region: "US East", performanceRequirement: "High" }, { cost: 30, carbon: 50, performance: 20 }, "demo-api-us"),
  createAnalysis({ workloadType: "data-processing", cpuCores: 16, ramGb: 64, storageGb: 1000, runtimeHours: 12, transferGb: 600, requestsPerDay: 0, region: "Western Europe", performanceRequirement: "High" }, { cost: 20, carbon: 60, performance: 20 }, "demo-data-eu"),
  createAnalysis({ workloadType: "other", cpuCores: 2, ramGb: 8, storageGb: 50, runtimeHours: 6, transferGb: 10, requestsPerDay: 0, region: "Southeast Asia", performanceRequirement: "Low" }, { cost: 34, carbon: 33, performance: 33 }, "demo-balanced-sea"),
];

export const historyStore: HistoryStore = {
  list() { try { const value = localStorage.getItem(STORAGE_KEY); return value ? JSON.parse(value) as AnalysisResult[] : demos; } catch { return demos; } },
  save(analysis) { const next = [analysis, ...this.list().filter((item) => item.id !== analysis.id)]; localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); },
  remove(id) { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list().filter((item) => item.id !== id))); },
  clear() { localStorage.setItem(STORAGE_KEY, "[]"); },
};
