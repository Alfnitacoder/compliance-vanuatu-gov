import { create } from 'zustand';
import { ComplianceItem, ComplianceFilters } from '../types/compliance';

interface ComplianceState {
  items: ComplianceItem[];
  isLoading: boolean;
  error: string | null;
  filters: ComplianceFilters;
  fetchItems: () => Promise<void>;
  createItem: (data: Partial<ComplianceItem>) => Promise<void>;
  updateItem: (id: string, data: Partial<ComplianceItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  setFilters: (filters: ComplianceFilters) => void;
}

// Mock data
const mockItems: ComplianceItem[] = [
  {
    id: '1',
    title: 'Environmental Protection Act',
    type: 'legislation',
    department: 'DEPC',
    status: 'active',
    description: 'Primary legislation for environmental protection and conservation',
    effectiveDate: '2023-01-01T00:00:00.000Z',
    lastReviewDate: '2024-01-15T00:00:00.000Z',
    nextReviewDate: '2025-01-15T00:00:00.000Z',
    tags: ['environment', 'protection', 'conservation'],
  },
  {
    id: '2',
    title: 'Renewable Energy Policy',
    type: 'policy',
    department: 'DoE',
    status: 'under_review',
    description: 'National policy framework for renewable energy development',
    effectiveDate: '2022-06-15T00:00:00.000Z',
    lastReviewDate: '2024-02-01T00:00:00.000Z',
    tags: ['energy', 'renewable', 'policy'],
  },
];

export const useCompliance = create<ComplianceState>((set) => ({
  items: [],
  isLoading: false,
  error: null,
  filters: {},

  fetchItems: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ items: mockItems, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch compliance items', isLoading: false });
    }
  },

  createItem: async (data: Partial<ComplianceItem>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newItem: ComplianceItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || '',
        type: data.type || 'other',
        department: data.department || '',
        status: 'active',
        description: data.description || '',
        effectiveDate: new Date().toISOString(),
        lastReviewDate: new Date().toISOString(),
        ...data,
      };
      set(state => ({
        items: [...state.items, newItem],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create compliance item', isLoading: false });
    }
  },

  updateItem: async (id: string, data: Partial<ComplianceItem>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, ...data } : item
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update compliance item', isLoading: false });
    }
  },

  deleteItem: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        items: state.items.filter(item => item.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete compliance item', isLoading: false });
    }
  },

  setFilters: (filters: ComplianceFilters) => {
    set({ filters });
  },
}));