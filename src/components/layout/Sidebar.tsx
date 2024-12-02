import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, AlertCircle, Settings, Users, BarChart, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLayout } from '../../lib/layout';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Compliance', href: '/compliance', icon: AlertCircle },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { isSidebarOpen, closeSidebar } = useLayout();

  // Close sidebar on route change on mobile
  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <span className="text-xl font-semibold">Menu</span>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            onClick={closeSidebar}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <NavItems />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="h-16 shrink-0" /> {/* Spacer for header */}
          <NavItems />
        </div>
      </div>
    </>
  );
}

function NavItems() {
  const location = useLocation();

  return (
    <nav className="flex flex-1 flex-col pt-4">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                      isActive
                        ? 'bg-gray-50 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    )}
                  >
                    <item.icon className={cn(
                      'h-6 w-6 shrink-0',
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                    )} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
}