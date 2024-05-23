import type { DirectoryModel } from '@/types/generated';
import type { DataProp, DirectoryShape, FileShape } from '@/types/shared';
import { acceptHMRUpdate, defineStore } from 'pinia';

function mapBackendToFrontend(data: DirectoryModel): DirectoryShape {
  return {
    dirName: data.dir_name,
    isDirectory: true,
    files: data.files.map((file) => {
      if (file.is_dir) {
        return mapBackendToFrontend(file);
      }
      return { fileName: file.file_name, isDirectory: false };
    }),
  } as DirectoryShape;
}
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
