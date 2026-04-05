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

  const getAll = async () => {
    const { data } = await finaliseApi.getStatusesFinaliseStatusGet();
    return data;
  };
  const getPreview = async (params: FinaliseConfigModel) => {
    const { data } =
      await finaliseApi.generatePreviewFinaliseGeneratePreviewPost(params);

    return data;
  };

  const schedule = async (categories: string[] | null) =>
    await finaliseApi.scheduleFinaliseFinaliseSchedulePost({
      categories,
    });

  const download = async (params: { exportId: string }) => {
    const { data } =
      await finaliseApi.downloadFinalizedZipFinaliseDownloadExportIdGet(
        params.exportId,
        {
          responseType: 'blob',
        },
      );
    return data;
  };

  return {
    getPreview,
    schedule,
    download,
    getAll,
  };
})();
export default finalize;
