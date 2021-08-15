import React, { createContext, useContext, useState, useCallback } from 'react';
import classNames from 'classnames';

export enum NotificationStyle {
  danger,
  success,
  info,
  warning,
}

export interface NotificationInfo {
  title: string;
  content: string;
  style?: NotificationStyle;
}

interface NotificationsData {
  notifications: NotificationInfo[];
}

const defaultNotifications: NotificationInfo[] = [];

const Notification = ({
  title,
  content,
  style = NotificationStyle.info,
}: NotificationInfo) => {
  const notificationTextColor = classNames({
    'text-green-500': style === NotificationStyle.success,
    'text-red-500': style === NotificationStyle.danger,
    'text-orange-500': style === NotificationStyle.warning,
    'text-blue-500': style === NotificationStyle.info,
  });

  return (
    <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg mt-6">
      <div className="flex flex-row">
        <div className="ml-2 mr-6">
          <span className={classNames('font-semibold', notificationTextColor)}>
            {title}
          </span>
          <span className="block text-gray-500">{content}</span>
        </div>
      </div>
    </div>
  );
};

const Notifications = ({ notifications }: NotificationsData) => {
  return (
    <div className="fixed top-10 right-10 z-10">
      {notifications.map((notification, idx) => {
        return (
          <Notification
            key={idx}
            title={notification.title}
            content={notification.content}
            style={notification.style}
          />
        );
      })}
    </div>
  );
};

const NotificationsContext = createContext({
  notifications: defaultNotifications,
  showNotification: (notification: NotificationInfo, callback: any) => {},
});

export const useNotificationsContext = () => {
  return useContext(NotificationsContext);
};

const NotificationsContextProvider = ({ children }: { children: any }) => {
  const defaultNotifications: NotificationInfo[] = [];
  const [notifications, setNotifications] = useState(defaultNotifications);
  const showNotification = useCallback(
    (notification: NotificationInfo, callback?: () => void | null) => {
      setNotifications((notifications) => {
        return [...notifications, notification];
      });

      if (callback) {
        callback();
      }

      setTimeout(() => {
        setNotifications((notifications) => {
          return notifications.slice(0, notifications.length - 1);
        });
      }, 1000);
    },
    [notifications]
  );

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        showNotification,
      }}>
      <Notifications notifications={notifications} />
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
