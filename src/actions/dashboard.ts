import { API_URL } from '@/constants';
import { DashboardApi } from '@/types/generated';

const api = new DashboardApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },
  API_URL,
);

export const get = async () => {
  const { data } = await api.getDashboardDashboardGet();
  return data;
};
