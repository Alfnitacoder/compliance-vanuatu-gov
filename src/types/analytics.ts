export interface DepartmentStats {
  department: string;
  totalItems: number;
  activeItems: number;
  pendingReview: number;
  complianceRate: number;
}

export interface ComplianceTypeStats {
  type: string;
  count: number;
  percentage: number;
}

export interface TrendData {
  month: string;
  complianceRate: number;
  totalItems: number;
}

export interface ProvinceStats {
  province: string;
  reports: number;
  issues: number;
  actions: number;
}