import { create } from 'zustand';
import { DepartmentStats, ComplianceTypeStats, TrendData, ProvinceStats } from '../types/analytics';

interface AnalyticsState {
  departmentStats: DepartmentStats[];
  complianceTypeStats: ComplianceTypeStats[];
  trendData: TrendData[];
  provinceStats: ProvinceStats[];
  isLoading: boolean;
  error: string | null;
  fetchAnalytics: () => Promise<void>;
}

// Mock data
const mockDepartmentStats: DepartmentStats[] = [
  { department: 'DEPC', totalItems: 45, activeItems: 38, pendingReview: 7, complianceRate: 84 },
  { department: 'DoE', totalItems: 32, activeItems: 28, pendingReview: 4, complianceRate: 87 },
  { department: 'VMGD', totalItems: 28, activeItems: 25, pendingReview: 3, complianceRate: 89 },
  { department: 'DoCC', totalItems: 35, activeItems: 30, pendingReview: 5, complianceRate: 85 },
  { department: 'NDMO', totalItems: 30, activeItems: 27, pendingReview: 3, complianceRate: 90 },
];

const mockComplianceTypeStats: ComplianceTypeStats[] = [
  { type: 'Policy', count: 45, percentage: 26 },
  { type: 'Legislation', count: 35, percentage: 21 },
  { type: 'Regulation', count: 50, percentage: 29 },
  { type: 'Court Case', count: 25, percentage: 15 },
  { type: 'Other', count: 15, percentage: 9 },
];

const mockTrendData: TrendData[] = [
  { month: 'Jan', complianceRate: 82, totalItems: 150 },
  { month: 'Feb', complianceRate: 85, totalItems: 155 },
  { month: 'Mar', complianceRate: 87, totalItems: 160 },
  { month: 'Apr', complianceRate: 86, totalItems: 158 },
  { month: 'May', complianceRate: 88, totalItems: 165 },
  { month: 'Jun', complianceRate: 87, totalItems: 170 },
];

const mockProvinceStats: ProvinceStats[] = [
  { province: 'Torba', reports: 25, issues: 8, actions: 12 },
  { province: 'Sanma', reports: 35, issues: 12, actions: 18 },
  { province: 'Penama', reports: 28, issues: 10, actions: 15 },
  { province: 'Malampa', reports: 32, issues: 11, actions: 16 },
  { province: 'Shefa', reports: 40, issues: 15, actions: 22 },
  { province: 'Tafea', reports: 30, issues: 9, actions: 14 },
];

export const useAnalytics = create<AnalyticsState>((set) => ({
  departmentStats: [],
  complianceTypeStats: [],
  trendData: [],
  provinceStats: [],
  isLoading: false,
  error: null,

  fetchAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({
        departmentStats: mockDepartmentStats,
        complianceTypeStats: mockComplianceTypeStats,
        trendData: mockTrendData,
        provinceStats: mockProvinceStats,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Failed to fetch analytics data', isLoading: false });
    }
  },
}));