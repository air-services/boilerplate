import axios from 'axios';

const rolesApi = {
  getList: () => {
    return axios.get('/api/v1/roles/');
  },
  getItem: (id: string) => {
    return axios.get(`/api/v1/roles/${id}`);
  },
  patchItem: (id: string, data: any) => {
    return axios.put(`/api/v1/roles/${id}`, data);
  },
};

export default rolesApi;
