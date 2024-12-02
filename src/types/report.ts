export type ReportType = 'field' | 'compliance' | 'gap' | 'action';
export type ReportStatus = 'draft' | 'submitted' | 'approved' | 'rejected';
export type Province = 'Torba' | 'Sanma' | 'Penama' | 'Malampa' | 'Shefa' | 'Tafea';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  department: string;
  province?: Province;
  status: ReportStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  summary?: string;
  attachments?: string[];
}

export interface ReportFilters {
  type?: ReportType;
  department?: string;
  province?: Province;
  status?: ReportStatus;
  startDate?: string;
  endDate?: string;
}