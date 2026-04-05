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

  const getAll = async ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    console.log('[getAll - page, pageSize);]', page, pageSize);
    const { data } = await finaliseApi.getStatusesFinaliseStatusGet(
      page,
      pageSize,
    );
    console.log('[getAll - data]', data);
    return data;
  };
  const getPreview = async (params: FinaliseConfigModel) => {
    const { data } =
      await finaliseApi.generatePreviewFinaliseGeneratePreviewPost(params);

    return data;
  };

  const schedule = async (
    categories: string[] | null,
    config: FinaliseConfigModel,
  ) => {
    await finaliseApi.scheduleFinaliseFinaliseSchedulePost({
      params: {
        categories,
      },
      config,
    });
  };

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

  const deleteOne = async (params: { exportId: string }) => {
    await finaliseApi.deleteFinalizedZipFinaliseDeleteZipExportIdGet(
      params.exportId,
    );
  };

  return {
    getPreview,
    schedule,
    download,
    getAll,
    deleteOne,
  };
})();
export default finalize;
