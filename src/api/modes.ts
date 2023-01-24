import { apiClient } from 'api/httpClient';

interface Entity {
  name: string;
  field: number;
}

export type ResponseType = {
  data: Entity[]
};

export const getModes = async() => {
  const response: ResponseType = await apiClient.get('/');

  return response.data;
};
