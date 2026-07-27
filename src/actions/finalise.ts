import { API_URL } from '@/constants';
import {
  Configuration,
  FinaliseApi,
  type FinaliseConfigModel,
} from '@/types/generated';

const finalize = (() => {
  const api = new FinaliseApi(
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
    const { data } = await api.getStatusesFinaliseStatusGet(page, pageSize);
    return data;
  };
  const getPreview = async (params: FinaliseConfigModel) => {
    const { data } =
      await api.generatePreviewFinaliseGeneratePreviewPost(params);

    return data;
  };

  const schedule = async (
    categories: string[] | null,
    config: FinaliseConfigModel,
  ) => {
    await api.scheduleFinaliseFinaliseSchedulePost({
      params: {
        categories,
      },
      config,
    });
  };

  const download = async (params: { exportId: string }) => {
    const { data } = await api.downloadFinalizedZipFinaliseDownloadExportIdGet(
      params.exportId,
      {
        responseType: 'blob',
      },
    );
    return data;
  };

  const deleteOne = async (params: { exportId: string }) => {
    await api.deleteFinalizedZipFinaliseDeleteZipExportIdGet(params.exportId);
  };

  const listen = async () => {
    const req = await api.streamExportsFinaliseExportsStreamGet({
      responseType: 'stream',
      adapter: 'fetch',
      headers: {
        Accept: 'text/event-stream',
      },
    });
    const stream = req.data;
    console.log(stream);
    return stream;
  };

  return {
    getPreview,
    schedule,
    download,
    getAll,
    deleteOne,
    listen,
  };
})();
export default finalize;
