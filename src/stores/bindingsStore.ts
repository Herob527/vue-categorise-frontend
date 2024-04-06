import { defineStore } from 'pinia';
import { getAll } from '@/actions/bindings';
import { statuses } from '@/types/shared';

type Entry = {
  id: string;
  duration: number;
  status: statuses;
  filename: string;
};

export const useBindingsStore = defineStore('bindings', {
  state: () => ({ entries: [] as Entry[], isInitialised: false }),
  getters: {
    getAll: (state) => state.entries,
  },
  actions: {
    async synchronise() {
      const data = await getAll();
      this.$state.entries =
        data?.map((entry) => ({
          id: entry.bindings.id,
          duration: entry.audios.audio_length,
          filename: entry.audios.file_name,
          status: statuses.IN_DB,
        })) || [];
    },
  },
});
