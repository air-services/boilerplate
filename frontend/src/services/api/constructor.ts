import apiClient from '../client';

const constructorApi = {
  generateTemplate: (templateID: string) => {
    return apiClient.post('/api/v1/constructor/templates/generate', {
      id: Number(templateID),
    });
  },
};

export default constructorApi;
