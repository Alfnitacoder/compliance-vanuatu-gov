import React from 'react';
import { useSettings } from '../../lib/settings';

export function SecuritySettings() {
  const { security, updateSecuritySettings, isLoading } = useSettings();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Security Settings</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="twoFactorAuth"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={security.twoFactorAuth}
                    onChange={(e) => updateSecuritySettings({ twoFactorAuth: e.target.checked })}
                    disabled={isLoading}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">
                    Two-Factor Authentication
                  </label>
                  <p className="text-gray-500">Enable two-factor authentication for additional security</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                id="sessionTimeout"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={security.sessionTimeout}
                onChange={(e) => updateSecuritySettings({ sessionTimeout: parseInt(e.target.value) })}
                min="5"
                max="120"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700">
                Password Expiry (days)
              </label>
              <input
                type="number"
                id="passwordExpiry"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={security.passwordExpiry}
                onChange={(e) => updateSecuritySettings({ passwordExpiry: parseInt(e.target.value) })}
                min="30"
                max="365"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="loginAttempts" className="block text-sm font-medium text-gray-700">
                Maximum Login Attempts
              </label>
              <input
                type="number"
                id="loginAttempts"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={security.loginAttempts}
                onChange={(e) => updateSecuritySettings({ loginAttempts: parseInt(e.target.value) })}
                min="3"
                max="10"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}