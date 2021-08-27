import apiClient from '../client';

const constructorApi = {
  generateApplicationFiles: (templateID: string) => {
    return apiClient.post('/api/v1/constructor/applications/generate-files', {
      id: Number(templateID),
    });
  },
};

export default constructorApi;
