import React, { createContext, useContext, useState, useCallback } from 'react';

export interface NotificationInfo {
  title: string;
  content: string;
}

interface NotificationsData {
  notifications: NotificationInfo[];
}

const defaultNotifications: NotificationInfo[] = [];

const Notification = ({ title, content }: NotificationInfo) => {
  return (
    <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg mt-6">
      <div className="flex flex-row">
        <div className="ml-2 mr-6">
          <span className="font-semibold text-green-500">{title}</span>
          <span className="block text-gray-500">{content}</span>
        </div>
      </div>
    </div>
  );
};

const Notifications = ({ notifications }: NotificationsData) => {
  return (
    <div className="fixed top-10 right-10">
      {notifications.map((notification, idx) => {
        return (
          <Notification
            key={idx}
            title={notification.title}
            content={notification.content}
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
    (notification: NotificationInfo, callback = null) => {
      setNotifications((notifications) => {
        return [...notifications, notification];
      });

      setTimeout(() => {
        setNotifications((notifications) => {
          return notifications.slice(0, notifications.length - 1);
        });

        if (callback) {
          callback();
        }
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
