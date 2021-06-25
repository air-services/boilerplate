import axios from 'axios';

const usersApi = {
  getList: () => {
    return axios.get('/api/v1/users/');
  },
  getItem: (id: string) => {
    return axios.get(`/api/v1/users/${id}`);
  },

  patchItem: (id: string, data: any) => {
    return axios.put(`/api/v1/users/${id}`, data);
  },
};

export default usersApi;
