import axios from 'axios';

const usersApi = {
  getUsers: () => {
    return axios.get('/api/v1/users/');
  },
};

export default usersApi;
