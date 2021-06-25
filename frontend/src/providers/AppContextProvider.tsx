import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';

import { setClientDefaultHeaders } from 'services/client';
import { getAccessToken, clearAccessToken } from 'services/auth';
import accountApi from 'services/api/account';
import { serializeToCamel } from '../services/api/serializers';

export interface AccountModel {
  data: {
    id: number | null;
    email: string;
    firstName: string;
    lastName: string;
    patronymic: string;
  };
  isLoaded: boolean;
}

export const defaultAccountState = (): AccountModel => {
  return {
    data: {
      id: null,
      email: '',
      firstName: '',
      lastName: '',
      patronymic: '',
    },
    isLoaded: false,
  };
};

const AppContextProvider = ({ children }: { children: any }) => {
  const [account, setAccount] = useState(defaultAccountState());

  // update account
  const updateAccount = useCallback((accountData) => {
    setAccount((prevState) => {
      return {
        ...prevState,
        ...accountData,
      };
    });
  }, []);

  // load account info
  const loadAccount = useCallback((onSuccess = null) => {
    setClientDefaultHeaders({ 'Access-Token': getAccessToken() });
    accountApi
      .load()
      .then((response) => {
        const accountData = serializeToCamel(response.data);
        updateAccount({ data: accountData, isLoaded: true });
        if (typeof onSuccess === 'function') {
          onSuccess(accountData);
        }
      })
      .catch(() => {
        updateAccount({ ...defaultAccountState(), isLoaded: true });
      });
  }, []);

  const logout = useCallback(() => {
    clearAccessToken();
    setClientDefaultHeaders({});
    loadAccount();
  }, []);

  useEffect(loadAccount, []);

  return (
    <AppContext.Provider
      value={{
        account,
        updateAccount,
        loadAccount,
        logout,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const AppContext = createContext({
  account: defaultAccountState(),
  updateAccount: (data: any) => {},
  loadAccount: (callback: any) => {},
  logout: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
