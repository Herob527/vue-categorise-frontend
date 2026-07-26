import { API_URL } from '@/constants';
import { AudioApi } from '@/types/generated';

const audio = (() => {
  const api = new AudioApi(
    {
      isJsonMime: (mime: string) => mime === 'application/json',
    },
    API_URL,
  );

  const getOne = async (id: string) => {
    const data = await api.downloadAudioAudioDownloadAudioIdGet(id, {
      responseType: 'blob',
      headers: {
        'Cache-Control': 'max-age=604800',
      },
    });
    return data.data as Blob;
  };

  const uploadAudio = async (id: string, file: File) => {
    const data = await api.uploadAudioAudioUploadPost(id, file);
    return data.data;
  };

  return {
    getOne,
    uploadAudio,
  };
})();

export default audio;
