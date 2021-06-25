import apiClient from 'axios';

interface HeadersModel {
  'Access-Token'?: string;
}

export const setClientDefaultHeaders = (headers: HeadersModel) => {
  apiClient.defaults.headers.common = headers;
};

export default apiClient;
