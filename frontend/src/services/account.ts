import axios from 'axios';

export interface AccountSignUpData {
  email: string;
  password: string;
}

const accountApi = {
  signUp: (account: AccountSignUpData) => {
    return axios.post('/api/v1/account/signup', account);
  },
};

export default accountApi;
