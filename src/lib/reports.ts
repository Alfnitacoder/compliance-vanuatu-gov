import { create } from 'zustand';
import { Report, ReportFilters } from '../types/report';

interface ReportsState {
  reports: Report[];
  isLoading: boolean;
  error: string | null;
  filters: ReportFilters;
  fetchReports: () => Promise<void>;
  createReport: (data: Partial<Report>) => Promise<void>;
  updateReport: (id: string, data: Partial<Report>) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
  setFilters: (filters: ReportFilters) => void;
}

// Mock data
const mockReports: Report[] = [
  {
    id: '1',
    title: 'Q1 Environmental Assessment - Torba Province',
    type: 'field',
    department: 'DEPC',
    province: 'Torba',
    status: 'approved',
    createdBy: 'John Doe',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-01-20T00:00:00.000Z',
    dueDate: '2024-03-31T00:00:00.000Z',
    summary: 'Quarterly environmental assessment report for Torba Province',
  },
  {
    id: '2',
    title: 'Energy Policy Compliance Review',
    type: 'compliance',
    department: 'DoE',
    status: 'submitted',
    createdBy: 'Jane Smith',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-05T00:00:00.000Z',
    summary: 'Review of energy policy compliance across all provinces',
  },
];

export const useReports = create<ReportsState>((set) => ({
  reports: [],
  isLoading: false,
  error: null,
  filters: {},

  fetchReports: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ reports: mockReports, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch reports', isLoading: false });
    }
  },

  createReport: async (data: Partial<Report>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newReport: Report = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || '',
        type: data.type || 'field',
        department: data.department || '',
        status: 'draft',
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      set(state => ({
        reports: [...state.reports, newReport],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create report', isLoading: false });
    }
  },

  updateReport: async (id: string, data: Partial<Report>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        reports: state.reports.map(report =>
          report.id === id
            ? { ...report, ...data, updatedAt: new Date().toISOString() }
            : report
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update report', isLoading: false });
    }
  },

  deleteReport: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        reports: state.reports.filter(report => report.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete report', isLoading: false });
    }
  },

  setFilters: (filters: ReportFilters) => {
    set({ filters });
  },
}));