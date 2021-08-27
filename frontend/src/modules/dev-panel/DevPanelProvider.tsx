import React, { useState, createContext, useContext, useCallback } from 'react';
import devApi from 'services/api/dev';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';

const DevPanelProvider = ({ children }: { children: any }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { showNotification } = useNotificationsContext();

  const registerRouters = useCallback(() => {
    setIsProcessing(true);
    devApi
      .runCommand('register-routers')
      .then(() => {
        showNotification(
          {
            title: 'Успех',
            content: 'Роуты зарегистрированы',
            style: NotificationStyle.success,
          },
          null
        );
      })
      .catch((e) => {
        showNotification(
          {
            title: 'Ошибка',
            content: e.response.data.detail,
            style: NotificationStyle.danger,
          },
          null
        );
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  const generateMigrations = useCallback(() => {
    setIsProcessing(true);
    devApi
      .runCommand('generate-migrations')
      .then(() => {
        showNotification(
          {
            title: 'Успех',
            content: 'Миграции сгенерированы',
            style: NotificationStyle.success,
          },
          null
        );
      })
      .catch((e) => {
        showNotification(
          {
            title: 'Ошибка',
            content: e.response.data.detail,
            style: NotificationStyle.danger,
          },
          null
        );
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  const migrate = useCallback(() => {
    setIsProcessing(true);
    devApi
      .runCommand('migrate')
      .then(() => {
        showNotification(
          {
            title: 'Успех',
            content: 'Миграции прошли успешно',
            style: NotificationStyle.success,
          },
          null
        );
      })
      .catch(() => {
        showNotification(
          {
            title: 'Ошибка',
            content: 'Не удалось мигрировать базу данных',
            style: NotificationStyle.danger,
          },
          null
        );
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  const generateContent = useCallback(() => {
    setIsProcessing(true);
    devApi
      .runCommand('reset-content')
      .then(() => {
        showNotification(
          {
            title: 'Успех',
            content: 'Данные сгенерированы',
            style: NotificationStyle.success,
          },
          null
        );
      })
      .catch(() => {
        showNotification(
          {
            title: 'Ошибка',
            content: 'Не удалось сгенерировать данные',
            style: NotificationStyle.danger,
          },
          null
        );
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, []);

  return (
    <DevPanelContext.Provider
      value={{
        generateContent,
        generateMigrations,
        registerRouters,
        migrate,
        isProcessing,
      }}>
      {children}
    </DevPanelContext.Provider>
  );
};

const DevPanelContext = createContext({
  generateContent: () => {},
  generateMigrations: () => {},
  migrate: () => {},
  registerRouters: () => {},
  isProcessing: false,
});

export const useDevPanelContext = () => {
  return useContext(DevPanelContext);
};

export default DevPanelProvider;
