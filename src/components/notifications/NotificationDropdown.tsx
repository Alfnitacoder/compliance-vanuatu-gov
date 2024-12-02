import React, { useRef, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { useNotifications } from '../../lib/notifications';
import { Notification } from '../../types/notification';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-blue-100 text-blue-800',
};

function NotificationItem({ notification }: { notification: Notification }) {
  const { markAsRead, clearNotification } = useNotifications();
  const navigate = useNavigate();

  const handleClick = () => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <div
      className={cn(
        'p-4 hover:bg-gray-50 flex items-start gap-x-4 cursor-pointer',
        notification.status === 'read' ? 'opacity-75' : ''
      )}
      onClick={handleClick}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
              priorityColors[notification.priority]
            )}
          >
            {notification.priority}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{notification.message}</p>
        <p className="mt-1 text-xs text-gray-400">
          {new Date(notification.timestamp).toLocaleString()}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearNotification(notification.id);
        }}
        className="text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function NotificationDropdown() {
  const { notifications, isOpen, toggleOpen, markAllAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) toggleOpen();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggleOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="text-gray-500 hover:text-gray-600 relative"
        onClick={toggleOpen}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Check className="h-4 w-4 mr-1" />
                Mark all as read
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500 text-center">No notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}