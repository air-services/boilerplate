import apiClient from './client';
import Cookie from 'js-cookie';

export interface AccountSignUpData {
  email: string;
  password: string;
}

const accountApi = {
  signUp: (account: AccountSignUpData) => {
    return apiClient.post('/api/v1/account/signup', account);
  },

  load: () => {
    return apiClient.get('/api/v1/account/load');
  },
};

export default accountApi;
