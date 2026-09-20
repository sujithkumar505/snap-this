import { createAnalysis } from "@/mock/data";
import { historyStore } from "@/mock/history";
import type { AnalysisResult, Priorities, WorkloadInput } from "@/types";

export interface AnalysisClient {
  analyzeWorkload(input: WorkloadInput, priorities: Priorities): Promise<AnalysisResult>;
  listAnalyses(): Promise<AnalysisResult[]>;
  getAnalysis(id: string): Promise<AnalysisResult | undefined>;
  deleteAnalysis(id: string): Promise<void>;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockClient: AnalysisClient = {
  async analyzeWorkload(input, priorities) { await wait(500 + Math.random() * 400); const analysis = createAnalysis(input, priorities); historyStore.save(analysis); return analysis; },
  async listAnalyses() { await wait(150); return historyStore.list(); },
  async getAnalysis(id) { await wait(150); return historyStore.list().find((item) => item.id === id); },
  async deleteAnalysis(id) { await wait(120); historyStore.remove(id); },
};

export const httpClient: AnalysisClient = {
  async analyzeWorkload() { throw new Error("Live analysis API is not configured."); },
  async listAnalyses() { throw new Error("Live analysis API is not configured."); },
  async getAnalysis() { throw new Error("Live analysis API is not configured."); },
  async deleteAnalysis() { throw new Error("Live analysis API is not configured."); },
};

export const apiClient = import.meta.env.VITE_USE_MOCK === "false" ? httpClient : mockClient;
