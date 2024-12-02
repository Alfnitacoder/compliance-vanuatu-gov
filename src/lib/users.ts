import { create } from 'zustand';
import { UserProfile, UserFormData, UserFilters } from '../types/user';

interface UsersState {
  users: UserProfile[];
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
  fetchUsers: () => Promise<void>;
  createUser: (data: UserFormData) => Promise<void>;
  updateUser: (id: string, data: Partial<UserFormData>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setFilters: (filters: UserFilters) => void;
}

// Simulated users data
const mockUsers: UserProfile[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    status: 'active',
    createdAt: '2024-03-15T00:00:00.000Z',
    lastLogin: '2024-03-20T10:30:00.000Z',
  },
  {
    id: '2',
    email: 'director@depc.gov.vu',
    name: 'DEPC Director',
    role: 'director',
    department: 'DEPC',
    status: 'active',
    createdAt: '2024-03-15T00:00:00.000Z',
    lastLogin: '2024-03-19T15:45:00.000Z',
  },
];

export const useUsers = create<UsersState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  filters: {},

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ users: mockUsers, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch users', isLoading: false });
    }
  },

  createUser: async (data: UserFormData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser: UserProfile = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      set(state => ({
        users: [...state.users, newUser],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create user', isLoading: false });
    }
  },

  updateUser: async (id: string, data: Partial<UserFormData>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        users: state.users.map(user =>
          user.id === id ? { ...user, ...data } : user
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update user', isLoading: false });
    }
  },

  deleteUser: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        users: state.users.filter(user => user.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete user', isLoading: false });
    }
  },

  setFilters: (filters: UserFilters) => {
    set({ filters });
  },
}));