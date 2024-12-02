import { create } from 'zustand';
import { Notification } from '../types/notification';

interface NotificationsState {
  notifications: Notification[];
  isOpen: boolean;
  toggleOpen: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Report Submitted',
    message: 'DEPC has submitted a new environmental assessment report for review.',
    priority: 'high',
    status: 'unread',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    link: '/reports',
  },
  {
    id: '2',
    title: 'Compliance Update Required',
    message: 'Energy Policy compliance status needs to be updated by end of week.',
    priority: 'medium',
    status: 'unread',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    link: '/compliance',
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur this weekend.',
    priority: 'low',
    status: 'unread',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

export const useNotifications = create<NotificationsState>((set) => ({
  notifications: mockNotifications,
  isOpen: false,
  
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  
  markAsRead: (id: string) => set((state) => ({
    notifications: state.notifications.map((notification) =>
      notification.id === id ? { ...notification, status: 'read' } : notification
    ),
  })),
  
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((notification) => ({
      ...notification,
      status: 'read',
    })),
  })),
  
  clearNotification: (id: string) => set((state) => ({
    notifications: state.notifications.filter((notification) => notification.id !== id),
  })),
}));