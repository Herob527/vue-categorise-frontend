import { API_URL } from '@/constants';
import {
  Configuration,
  FinaliseApi,
  type FinaliseConfigModel,
} from '@/types/generated';

const finalize = (() => {
  const finaliseApi = new FinaliseApi(
    new Configuration({
      basePath: API_URL,
    }),
  );
  const getPreview = async (params: FinaliseConfigModel) => {
    const { data } =
      await finaliseApi.generatePreviewFinaliseGeneratePreviewPost(params);

    return data;
  };

  const schedule = async (category: string | null) =>
    await finaliseApi.scheduleFinaliseFinaliseScheduleCategoryGet(category);

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
