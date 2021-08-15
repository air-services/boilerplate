import React from 'react';
import AccountSettings from 'modules/account/AccountSettings/AccountSettings';
import { useAppContext } from 'providers/AppContextProvider';

const AccountSettingsPage = () => {
  const { account, updateAccount } = useAppContext();
  return account.isLoaded && account.data.id ? (
    <AccountSettings account={account} updateAccount={updateAccount} />
  ) : null;
};

export default AccountSettingsPage;
