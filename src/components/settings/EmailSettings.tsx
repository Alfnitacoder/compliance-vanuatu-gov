import React from 'react';
import { useSettings } from '../../lib/settings';

export function EmailSettings() {
  const { email, updateEmailSettings, isLoading } = useSettings();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Email Notifications</h3>
          <div className="mt-6 space-y-6">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="emailNotifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={email.emailNotifications}
                  onChange={(e) => updateEmailSettings({ emailNotifications: e.target.checked })}
                  disabled={isLoading}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                  Enable Email Notifications
                </label>
                <p className="text-gray-500">Receive notifications via email</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="dailyDigest"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={email.dailyDigest}
                  onChange={(e) => updateEmailSettings({ dailyDigest: e.target.checked })}
                  disabled={isLoading || !email.emailNotifications}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="dailyDigest" className="font-medium text-gray-700">
                  Daily Digest
                </label>
                <p className="text-gray-500">Receive a daily summary of activities</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="weeklyReport"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={email.weeklyReport}
                  onChange={(e) => updateEmailSettings({ weeklyReport: e.target.checked })}
                  disabled={isLoading || !email.emailNotifications}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="weeklyReport" className="font-medium text-gray-700">
                  Weekly Report
                </label>
                <p className="text-gray-500">Receive weekly compliance reports</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="criticalAlerts"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={email.criticalAlerts}
                  onChange={(e) => updateEmailSettings({ criticalAlerts: e.target.checked })}
                  disabled={isLoading || !email.emailNotifications}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="criticalAlerts" className="font-medium text-gray-700">
                  Critical Alerts
                </label>
                <p className="text-gray-500">Receive immediate notifications for critical issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}