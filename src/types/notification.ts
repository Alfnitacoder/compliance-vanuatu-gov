export type NotificationPriority = 'low' | 'medium' | 'high';
export type NotificationStatus = 'unread' | 'read';

export interface Notification {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  timestamp: string;
  link?: string;
}