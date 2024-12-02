import { create } from 'zustand';
import { SystemSettings, EmailSettings, SecuritySettings } from '../types/settings';

interface SettingsState {
  system: SystemSettings;
  email: EmailSettings;
  security: SecuritySettings;
  isLoading: boolean;
  error: string | null;
  updateSystemSettings: (settings: Partial<SystemSettings>) => Promise<void>;
  updateEmailSettings: (settings: Partial<EmailSettings>) => Promise<void>;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => Promise<void>;
}

const defaultSettings: SettingsState = {
  system: {
    notifications: 'both',
    theme: 'light',
    language: 'en',
    autoSave: true,
    retentionPeriod: 90,
  },
  email: {
    emailNotifications: true,
    dailyDigest: true,
    weeklyReport: true,
    criticalAlerts: true,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 3,
  },
  isLoading: false,
  error: null,
  updateSystemSettings: async () => {},
  updateEmailSettings: async () => {},
  updateSecuritySettings: async () => {},
};

export const useSettings = create<SettingsState>((set) => ({
  ...defaultSettings,

  updateSystemSettings: async (settings: Partial<SystemSettings>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        system: { ...state.system, ...settings },
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update system settings', isLoading: false });
    }
  },

  updateEmailSettings: async (settings: Partial<EmailSettings>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        email: { ...state.email, ...settings },
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update email settings', isLoading: false });
    }
  },

  updateSecuritySettings: async (settings: Partial<SecuritySettings>) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        security: { ...state.security, ...settings },
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update security settings', isLoading: false });
    }
  },
}));