import apiClient from '../client';

export interface AccountSignUpData {
  email: string;
  password: string;
}

export interface AccountUpdateData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
}

export interface AccountRequestUpdateData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  patronymic: string;
}

const accountApi = {
  signUp: (account: AccountSignUpData) => {
    return apiClient.post('/api/v1/account/signup', account);
  },

  logIn: (account: AccountSignUpData) => {
    return apiClient.post('/api/v1/account/login', account);
  },

  load: () => {
    return apiClient.get('/api/v1/account/load');
  },

  update: (account: AccountRequestUpdateData) => {
    return apiClient.post('/api/v1/account/update', account);
  },
};

export default accountApi;
