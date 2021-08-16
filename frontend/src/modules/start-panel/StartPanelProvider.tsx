import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';

import rest from 'services/api/rest';
import devApi from 'services/api/dev';
import { serializeToCamel } from 'services/api/serializers';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';

const StartPanelProvider = ({ children }: { children: any }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    rest.api.cards.getList().then((response) => {
      setCards(serializeToCamel(response.data.items));
    });
  }, []);
  const { showNotification } = useNotificationsContext();

  const generateContent = useCallback(() => {
    devApi
      .generateContent()
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
            style: NotificationStyle.success,
          },
          null
        );
      });
  }, []);

  return (
    <StartPanelContext.Provider
      value={{
        cards,
        generateContent,
      }}>
      {children}
    </StartPanelContext.Provider>
  );
};

const StartPanelContext = createContext({
  cards: [],
  generateContent: () => {},
});

export const useStartPanelContext = () => {
  return useContext(StartPanelContext);
};

export default StartPanelProvider;
