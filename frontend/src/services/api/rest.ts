import apiClient from 'services/client';
import { AxiosPromise } from 'axios';

export interface RestModelApiPagination {
  page: number;
  limit: number;
}

export interface RestModelApi {
  getList: (config?: {
    search?: any;
    sorting?: any;
    pagination?: RestModelApiPagination;
  }) => AxiosPromise;
  getItem: (id: string) => AxiosPromise;
  patchItem: (id: string, data: any) => AxiosPromise;
}

export const getModelCrud = (url: string): RestModelApi => ({
  getList: ({ search = {}, pagination = {} } = {}) => {
    const searchString = search ? JSON.stringify(search) : '';
    const paginationString = pagination ? JSON.stringify(pagination) : '';
    const urlParams = new URLSearchParams({
      search: searchString,
      pagination: paginationString,
    }).toString();

    return apiClient.get(`${url}/?${urlParams}`);
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
