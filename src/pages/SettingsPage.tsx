import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { SystemSettings } from '../components/settings/SystemSettings';
import { EmailSettings } from '../components/settings/EmailSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { cn } from '../lib/utils';

const tabs = [
  { id: 'system', name: 'System' },
  { id: 'email', name: 'Email' },
  { id: 'security', name: 'Security' },
];

export function SettingsPage() {
  const [currentTab, setCurrentTab] = useState('system');

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Header />
      <Sidebar />
      
      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage your system preferences and configurations
              </p>
            </div>
          </div>

          <div className="mt-8">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={cn(
                      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                      currentTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Panels */}
            <div className="mt-8">
              {currentTab === 'system' && <SystemSettings />}
              {currentTab === 'email' && <EmailSettings />}
              {currentTab === 'security' && <SecuritySettings />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}