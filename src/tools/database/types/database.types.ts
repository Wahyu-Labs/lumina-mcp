export interface ExplainRow {
  id: number;
  select_type: string;
  table: string;
  partitions?: string;
  type: string;
  possible_keys: string | null;
  key: string | null;
  key_len: string | null;
  ref: string | null;
  rows: number;
  filtered: number;
  Extra: string | null;
}

export interface TableAnalysis {
  table: string;
  accessType: string;
  possibleKeys: string | null;
  usedKey: string | null;
  keyLen: string | null;
  ref: string | null;
  rowsExamined: number;
  rowsFiltered: number;
  extra: string | null;
  problems: string[];
  recommendation: string | null;
}

export interface SeniorAuditorReport {
  performanceVerdict: 'EXCELLENT' | 'GOOD' | 'NEEDS_OPTIMIZATION' | 'CRITICAL';
  securityVerdict: 'SECURE' | 'WARNING' | 'RISKY';
  speedVerdict: 'OPTIMAL' | 'ACCEPTABLE' | 'SLOW';
  notes: string[];
  suggestions: string[];
}

export interface QueryAnalysisResult {
  explainRows: ExplainRow[];
  warnings: unknown[];
  explainAnalyze: string | null;
  tableAnalysis: TableAnalysis[];
  seniorAudit: SeniorAuditorReport;
}

export interface PostgresQueryAnalysisResult {
  explainPlan: string[];
  explainAnalyze: string[] | null;
  seniorAudit: SeniorAuditorReport;
}
