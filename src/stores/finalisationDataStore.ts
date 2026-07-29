import type { DirectoryModel } from '@/types/generated';
import type { DirectoryShape } from '@/types/shared';
import { acceptHMRUpdate, defineStore } from 'pinia';

const mapBackendToFrontend = (data: DirectoryModel): DirectoryShape =>
  ({
    dirName: data.dir_name,
    isDirectory: true,
    categoryId: data.category_id as string,
    files: data.files.map((file) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (file.is_dir) {
        return mapBackendToFrontend(file);
      }
      return { fileName: file.file_name, isDirectory: false };
    }),
  }) satisfies DirectoryShape;
export const useFinaliseRealPreviewStore = defineStore(
  'finalise-real-preview',
  {
    state: () => ({
      data: null as DirectoryModel | null,
    }),
    actions: {
      setData(data: DirectoryModel) {
        this.data = data;
      },
    },
    getters: {
      processedData: (state) => {
        if (state.data === null) return;
        return mapBackendToFrontend(state.data);
      },
    },
  },
);
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useFinaliseRealPreviewStore, import.meta.hot),
  );
}
