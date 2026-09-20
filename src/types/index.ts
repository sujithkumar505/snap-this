export type WorkloadType = "web-app" | "api" | "data-processing" | "ml-ai" | "other";
export type Region = "India" | "US East" | "Western Europe" | "Southeast Asia";
export type PerformanceRequirement = "Low" | "Standard" | "High" | "Critical";
export type DataType = "official" | "estimated" | "benchmark" | "mock";

export type WorkloadInput = {
  workloadType: WorkloadType;
  cpuCores: number;
  ramGb: number;
  storageGb: number;
  runtimeHours: number;
  transferGb: number;
  requestsPerDay: number;
  region: Region;
  performanceRequirement: PerformanceRequirement;
};

export type Priorities = { cost: number; carbon: number; performance: number };

export type SourcedValue = {
  value: number;
  unit: string;
  dataType: DataType;
  source: string;
  retrievedAt: string;
  methodology?: string;
};

export type Provider = "AWS" | "Google Cloud" | "Azure";

export type CandidateConfig = {
  id: string;
  provider: Provider;
  service: string;
  cpuCores: number;
  ramGb: number;
  storageGb: number;
  runtimeHours: number;
  region: Region;
  cost: SourcedValue;
  carbon: SourcedValue;
  performance: SourcedValue;
  overallScore: number;
  compatible: boolean;
};

export type AnalysisResult = {
  id: string;
  createdAt: string;
  input: WorkloadInput;
  priorities: Priorities;
  candidates: CandidateConfig[];
  providerBest: Record<Provider, string | null>;
  recommendations: { lowerCost: string; lowerCarbon: string; balanced: string };
  warnings: string[];
  dataMode: "mock" | "live";
};

export const PROVIDERS: Provider[] = ["AWS", "Google Cloud", "Azure"];
