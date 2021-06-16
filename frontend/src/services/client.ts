import apiClient from 'axios';

export const setClientDefaultHeaders = (headers: { 'Access-Token': string }) => {
  apiClient.defaults.headers.common = headers;
};

export default apiClient;
