import React, { createContext, useContext, useState, useCallback } from 'react';
import classNames from 'classnames';
import { useTabs } from 'components/ui/Tabs/Tabs';

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
  close(key: number): void;
}

interface NotificationProps extends NotificationInfo {
  idx: number;
  close(key: number): void;
}

const defaultNotifications: NotificationInfo[] = [];

const Notification = ({
  close,
  title,
  content,
  idx,
  style = NotificationStyle.info,
}: NotificationProps) => {
  const notificationTextColor = classNames({
    'text-green-500': style === NotificationStyle.success,
    'text-red-500': style === NotificationStyle.danger,
    'text-orange-500': style === NotificationStyle.warning,
    'text-blue-500': style === NotificationStyle.info,
  });

  const onClickHandler = useCallback(() => close(idx), []);

  return (
    <div
      className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg mt-6"
      onClick={onClickHandler}>
      <div className="flex flex-row">
        <div className="ml-2 mr-6">
          <span className={classNames('font-semibold', notificationTextColor)}>
            {title}
          </span>
          <div
            className="block text-gray-500"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

const Notifications = ({ notifications, close }: NotificationsData) => {
  return (
    <div className="fixed top-10 right-10 z-10">
      {notifications.map((notification, idx) => {
        return (
          <Notification
            key={idx}
            idx={idx}
            close={close}
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
      }, 5000);
    },
    [notifications]
  );

  const close = useCallback((idx) => {
    console.log(idx);
    setNotifications((notifications) => [
      ...notifications.slice(0, idx),
      ...notifications.slice(idx + 1),
    ]);
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        showNotification,
      }}>
      <Notifications notifications={notifications} close={close} />
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
