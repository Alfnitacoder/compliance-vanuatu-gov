export type NotificationType = 'email' | 'in_app' | 'both' | 'none';
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'fr' | 'bi';

export interface SystemSettings {
  notifications: NotificationType;
  theme: Theme;
  language: Language;
  autoSave: boolean;
  retentionPeriod: number;
}

export interface EmailSettings {
  emailNotifications: boolean;
  dailyDigest: boolean;
  weeklyReport: boolean;
  criticalAlerts: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
}