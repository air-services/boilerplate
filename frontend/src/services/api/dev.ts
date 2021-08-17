import apiClient from '../client';

const devApi = {
  runCommand: (command: string) => {
    return apiClient.post('/api/v1/dev/run-command/', { command });
  },
};

export default devApi;
