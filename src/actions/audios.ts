import { API_URL } from '@/constants';
import { AudioApi } from '@/types/generated';

const audios = (() => {
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
    await api.uploadAudioAudioUploadPost(id, file);
  };

  return {
    getOne,
    uploadAudio,
  };
})();

export default audios;
