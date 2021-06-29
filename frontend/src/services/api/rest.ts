import apiClient from 'services/client';
import { AxiosPromise } from 'axios';

export interface RestModelApi {
  getList: () => AxiosPromise;
  getItem: (id: string) => AxiosPromise;
  patchItem: (id: string, data: any) => AxiosPromise;
}

export const getModelCrud = (url: string): RestModelApi => ({
  getList: () => {
    return apiClient.get(`${url}/`);
  },
  getItem: (id: string) => {
    return apiClient.get(`${url}/${id}`);
  },
  patchItem: (id: string, data: any) => {
    return apiClient.put(`${url}/${id}`, data);
  },
});

class RestApi {
  baseUrl = '/api/v1';
  api: {
    users: RestModelApi;
    projects: RestModelApi;
    roles: RestModelApi;
  };

  constructor() {
    this.api = {
      users: getModelCrud(`${this.baseUrl}/users`),
      projects: getModelCrud(`${this.baseUrl}/projects`),
      roles: getModelCrud(`${this.baseUrl}/roles`),
    };
  }
}

const restApi = new RestApi();

export default restApi;
