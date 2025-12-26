import { API_URL } from '@/constants';
import { FinaliseApi, type FinaliseConfigModel } from '@/types/generated';

const finaliseApi = new FinaliseApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },

  API_URL,
);

const finalize = () => {
  const post = async (params: FinaliseConfigModel) => {
    const { data } =
      await finaliseApi.finaliseFinaliseGeneratePreviewPost(params);

    return data;
  };

  const download = async () => {
    const { data } =
      await finaliseApi.downloadFinalizedZipFinaliseDownloadZipGet({
        responseType: 'blob',
      });
    return data;
  };
  return {
    post,
    download,
  };
};
export default finalize;
