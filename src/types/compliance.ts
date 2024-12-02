export type ComplianceType = 'policy' | 'legislation' | 'regulation' | 'court_case' | 'other';
export type ComplianceStatus = 'active' | 'pending' | 'under_review' | 'archived';

export interface ComplianceItem {
  id: string;
  title: string;
  type: ComplianceType;
  department: string;
  status: ComplianceStatus;
  description: string;
  effectiveDate: string;
  lastReviewDate: string;
  nextReviewDate?: string;
  attachments?: string[];
  tags?: string[];
}

export interface ComplianceFilters {
  type?: ComplianceType;
  department?: string;
  status?: ComplianceStatus;
  startDate?: string;
  endDate?: string;
}