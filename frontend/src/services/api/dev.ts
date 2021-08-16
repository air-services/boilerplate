import apiClient from '../client';

const devApi = {
  generateContent: () => {
    return apiClient.post('/api/v1/dev/generate-content/');
  },
};

export default devApi;
