import { API_URL } from '@/constants';
import { FinaliseApi, type FinaliseConfigModel } from '@/types/generated';

const finaliseApi = new FinaliseApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },

  API_URL,
);

export const post = async (params: FinaliseConfigModel) => {
  const { data } = await finaliseApi.finaliseFinalisePost(params);

  return data;
};


export const download = async () => {
  const { data } = await finaliseApi.downloadFinalizedZipFinaliseDownloadZipGet(
    {
      responseType: 'blob',
    },
  );
  return data;
};
