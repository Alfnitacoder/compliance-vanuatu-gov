import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { AuthState, User, ROLE_PERMISSIONS } from '../types/auth';

// Simulated API call - replace with actual API integration
const loginApi = async (email: string, password: string): Promise<{ token: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate different user roles
  const users = {
    'admin@example.com': {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      permissions: ROLE_PERMISSIONS.admin,
    },
    'director@depc.gov.vu': {
      id: '2',
      email: 'director@depc.gov.vu',
      name: 'DEPC Director',
      role: 'director',
      departmentId: 'DEPC',
      permissions: ROLE_PERMISSIONS.director,
    },
    'officer@doe.gov.vu': {
      id: '3',
      email: 'officer@doe.gov.vu',
      name: 'Compliance Officer',
      role: 'compliance_officer',
      departmentId: 'DoE',
      permissions: ROLE_PERMISSIONS.compliance_officer,
    },
  };

  const user = users[email as keyof typeof users];
  if (user && password === 'password') {
    // In a real application, you would receive a JWT from the server
    // Here we're creating a mock JWT with the user data
    const token = 'mock_jwt_token';
    return { token };
  }
  throw new Error('Invalid credentials');
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const { token } = await loginApi(email, password);
      // In a real application, you would decode the JWT
      // Here we're simulating the decoded user data
      const users = {
        'admin@example.com': {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin' as const,
          permissions: ROLE_PERMISSIONS.admin,
        },
        'director@depc.gov.vu': {
          id: '2',
          email: 'director@depc.gov.vu',
          name: 'DEPC Director',
          role: 'director' as const,
          departmentId: 'DEPC',
          permissions: ROLE_PERMISSIONS.director,
        },
        'officer@doe.gov.vu': {
          id: '3',
          email: 'officer@doe.gov.vu',
          name: 'Compliance Officer',
          role: 'compliance_officer' as const,
          departmentId: 'DoE',
          permissions: ROLE_PERMISSIONS.compliance_officer,
        },
      };
      
      const user = users[email as keyof typeof users];
      if (!user) throw new Error('User not found');
      
      set({
        token,
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  logout: () => {
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  hasPermission: (permission: string) => {
    const { user } = get();
    return user?.permissions.includes(permission) || false;
  },
}));