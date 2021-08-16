import apiClient from 'services/client';
import { AxiosPromise } from 'axios';
import { serializeToSnake } from 'services/api/serializers';

export interface RestModelApiPagination {
  page: number;
  limit: number;
}

export type OrderType = 'ASC' | 'DESC';

export interface RestModelApiSorting {
  field: string;
  order: OrderType;
}

export interface RestModelApi {
  getList: (config?: {
    search?: any;
    sorting?: RestModelApiSorting;
    pagination?: RestModelApiPagination;
  }) => AxiosPromise;
  createItem: (data: any) => AxiosPromise;
  getItem: (id: string) => AxiosPromise;
  patchItem: (id: string, data: any) => AxiosPromise;
  removeItem: (id: string) => AxiosPromise;
}

export const getModelCrud = (url: string): RestModelApi => ({
  getList: ({ search = {}, pagination = {}, sorting = {} } = {}) => {
    const searchString = search ? JSON.stringify(search) : '';
    const paginationString = pagination ? JSON.stringify(pagination) : '';
    const sortingString = sorting ? JSON.stringify(sorting) : '';

    const urlParams = new URLSearchParams({
      search: searchString,
      pagination: paginationString,
      sorting: sortingString,
    }).toString();

    return apiClient.get(`${url}/?${urlParams}`);
  },
  createItem: (data: any) => {
    return apiClient.post(`${url}/`, data);
  },
  getItem: (id: string) => {
    return apiClient.get(`${url}/${id}`);
  },
  patchItem: (id: string, data: any) => {
    return apiClient.put(`${url}/${id}`, data);
  },
  removeItem: (id: string) => {
    return apiClient.delete(`${url}/${id}`);
  },
});

class RestApi {
  baseUrl = '/api/v1';
  api: {
    users: RestModelApi;
    projects: RestModelApi;
    roles: RestModelApi;
    dashboards: RestModelApi;
    icons: RestModelApi;
    cards: RestModelApi;
  };

  constructor() {
    this.api = {
      users: getModelCrud(`${this.baseUrl}/users`),
      projects: getModelCrud(`${this.baseUrl}/projects`),
      roles: getModelCrud(`${this.baseUrl}/roles`),
      dashboards: getModelCrud(`${this.baseUrl}/dashboards`),
      icons: getModelCrud(`${this.baseUrl}/icons`),
      cards: getModelCrud(`${this.baseUrl}/cards`),
    };
  }
}

const restApi = new RestApi();

export default restApi;
