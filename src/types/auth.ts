export type UserRole = 'admin' | 'director' | 'department_user' | 'compliance_officer' | 'compliance_manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  departmentId?: string;
  avatar?: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const PERMISSIONS = {
  VIEW_REPORTS: 'view_reports',
  CREATE_REPORTS: 'create_reports',
  EDIT_REPORTS: 'edit_reports',
  DELETE_REPORTS: 'delete_reports',
  VIEW_COMPLIANCE: 'view_compliance',
  MANAGE_COMPLIANCE: 'manage_compliance',
  APPROVE_COMPLIANCE: 'approve_compliance',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_USERS: 'manage_users',
  MANAGE_SETTINGS: 'manage_settings',
} as const;

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: Object.values(PERMISSIONS),
  director: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_COMPLIANCE,
    PERMISSIONS.APPROVE_COMPLIANCE,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_SETTINGS,
  ],
  department_user: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.CREATE_REPORTS,
    PERMISSIONS.EDIT_REPORTS,
    PERMISSIONS.VIEW_COMPLIANCE,
  ],
  compliance_officer: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_COMPLIANCE,
    PERMISSIONS.MANAGE_COMPLIANCE,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  compliance_manager: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_COMPLIANCE,
    PERMISSIONS.MANAGE_COMPLIANCE,
    PERMISSIONS.APPROVE_COMPLIANCE,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
};