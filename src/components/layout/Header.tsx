import React from 'react';
import { Menu } from 'lucide-react';
import { useLayout } from '../../lib/layout';
import { NotificationDropdown } from '../notifications/NotificationDropdown';
import { UserDropdown } from '../user/UserDropdown';

export function Header() {
  const { toggleSidebar } = useLayout();

  return (
    <header className="fixed top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Vanuatu.svg"
                alt="Vanuatu Flag"
                className="h-8 w-auto"
              />
              <span className="text-xl font-semibold text-gray-900">
                Vanuatu Compliance Hub
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}