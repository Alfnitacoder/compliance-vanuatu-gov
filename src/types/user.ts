import { Department } from './department';
import { UserRole } from './auth';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: Department;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

export interface UserFormData {
  email: string;
  name: string;
  role: UserRole;
  department?: Department;
  password?: string;
}

export interface UserFilters {
  role?: UserRole;
  department?: Department;
  status?: 'active' | 'inactive';
}