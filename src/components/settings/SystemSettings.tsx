import React from 'react';
import { useSettings } from '../../lib/settings';
import { useTheme } from '../../lib/theme';
import { NotificationType, Theme, Language } from '../../types/settings';

const notificationOptions: { value: NotificationType; label: string }[] = [
  { value: 'email', label: 'Email Only' },
  { value: 'in_app', label: 'In-App Only' },
  { value: 'both', label: 'Email & In-App' },
  { value: 'none', label: 'None' },
];

const themeOptions: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

const languageOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'bi', label: 'Bislama' },
];

export function SystemSettings() {
  const { system, updateSystemSettings, isLoading } = useSettings();
  const { setTheme } = useTheme();

  const handleThemeChange = (theme: Theme) => {
    updateSystemSettings({ theme });
    setTheme(theme);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">System Preferences</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="notifications" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Notifications
              </label>
              <select
                id="notifications"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={system.notifications}
                onChange={(e) => updateSystemSettings({ notifications: e.target.value as NotificationType })}
                disabled={isLoading}
              >
                {notificationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme
              </label>
              <select
                id="theme"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={system.theme}
                onChange={(e) => handleThemeChange(e.target.value as Theme)}
                disabled={isLoading}
              >
                {themeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rest of the settings remain the same */}
          </div>
        </div>
      </div>
    </div>
  );
}