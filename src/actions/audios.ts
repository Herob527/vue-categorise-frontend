import { API_URL } from '@/constants';
import { AudioApi } from '@/types/generated';

const audioApi = new AudioApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },
  API_URL,
);

export const getOne = async (id: string) => {
  const data = await audioApi.downloadAudioAudioDownloadAudioIdGet(id, {
    responseType: 'blob',
  });
  return data.data as Blob;
};
