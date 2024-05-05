import { FinaliseApi, type FinaliseConfigModel } from '@/types/generated';

const finaliseApi = new FinaliseApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },
  'http://localhost:8000',
);

export const post = async (params: FinaliseConfigModel = {}) => {
  const { data } = await finaliseApi.finaliseFinalisePost(params);
  return data;
};
