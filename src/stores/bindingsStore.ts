import { defineStore } from 'pinia';
import { getAll, post } from '@/actions/bindings';
import { statuses } from '@/types/shared';
import { v4 } from 'uuid';

type Entry = {
  id: string;
  duration?: number | null;
  status: statuses;
  filename: string;
  file: File;
};

export const useBindingsStore = defineStore('bindings', {
  state: () => ({
    entries: [] as Entry[],
    isInitialised: false,
  }),
  getters: {
    getAll: (state) => state.entries,
  },
  actions: {
    getAvailableStatuses() {
      return new Set(this.entries.map((e) => e.status));
    },
    addLocalFiles(files: FileList) {
      for (const file of files) {
        this.entries.push({
          id: v4(),
          status: statuses.PENDING,
          filename: file.name,
          duration: null,
          file,
        });
      }
    },
    submitAll() {
      const toSubmit = this.entries.filter(
        (e) => e.status === statuses.PENDING || e.status === statuses.ERROR,
      );
      toSubmit.forEach(async (entry) => {
        try {
          entry.status = statuses.PROCESSING;
          await post({ audio: entry.file, category: 'unassigned' });
          this.synchronise();
        } catch (e) {
          console.error(e);
          entry.status = statuses.ERROR;
        }
      });
    },
    async synchronise() {
      const data = await getAll();
      this.$state.entries =
        data?.map((entry) => ({
          id: entry.bindings.id,
          duration: entry.audios.audio_length,
          filename: entry.audios.file_name,
          status: statuses.IN_DB,
          file: new File([], entry.audios.file_name),
        })) || [];
    },
  },
});
