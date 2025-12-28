import { API_URL } from '@/constants';
import { FinaliseApi, type FinaliseConfigModel } from '@/types/generated';

const finaliseApi = new FinaliseApi(
  {
    isJsonMime: (mime: string) => mime === 'application/json',
  },

  API_URL,
);

const finalize = (() => {
  const getPreview = async (params: FinaliseConfigModel) => {
    const { data } =
      await finaliseApi.generatePreviewFinaliseGeneratePreviewPost(params);

    return data;
  };

  const schedule = async (category: string | null) => {
    const { data } =
      await finaliseApi.scheduleFinaliseFinaliseScheduleCategoryGet(category);
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
    post: getPreview,
    schedule,
    download,
  };
})();
export default finalize;
