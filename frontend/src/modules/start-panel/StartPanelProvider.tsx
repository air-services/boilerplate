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
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;

const StartPanelProvider = ({ children }: { children: any }) => {
  const [cards, setCards] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const loadCards = useCallback(() => {
    rest.api.cards.getList().then((response) => {
      setCards(serializeToCamel(response.data.items));
    });
  }, []);

  useEffect(() => {
    loadCards();
  }, []);
  const { showNotification } = useNotificationsContext();

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
        loadCards();
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
    <StartPanelContext.Provider
      value={{
        cards,
        generateContent,
        isProcessing,
      }}>
      {children}
    </StartPanelContext.Provider>
  );
};

const StartPanelContext = createContext({
  cards: [],
  generateContent: () => {},
  isProcessing: false,
});

export const useStartPanelContext = () => {
  return useContext(StartPanelContext);
};

export default StartPanelProvider;
