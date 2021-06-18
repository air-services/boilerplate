import React, { useCallback, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { setClientDefaultHeaders } from '../services/client';
import accountApi from '../services/account';
import { getAccessToken } from '../services/auth';

export const defaultAccountState = () => {
  return {
    isLoaded: false,
    id: null,
    email: '',
    phone: '',
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
  const loadAccount = useCallback(() => {
    setClientDefaultHeaders({ 'Access-Token': getAccessToken() });
    accountApi.load().then((response) => {
      updateAccount(response.data.account);
    });
  }, []);

  useEffect(loadAccount, []);

  return (
    <AppContext.Provider
      value={{
        account,
        updateAccount,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const AppContext = createContext({
  account: defaultAccountState(),
  updateAccount: (data: any) => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
