import { API_URL } from '@/constants';
import { DashboardApi } from '@/types/generated';

const dashboard = (() => {
  const api = new DashboardApi(
    {
      isJsonMime: (mime: string) => mime === 'application/json',
    },
    API_URL,
  );

  const get = async () => {
    const { data } = await api.getDashboardDashboardGet();
    return data;
  };

  return {
    get,
  };
})();

export default dashboard;
