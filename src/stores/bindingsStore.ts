import { acceptHMRUpdate, defineStore } from 'pinia';
import { deleteOne, getAll, post } from '@/actions/bindings';
import { statuses, type Entry } from '@/types/shared';
import { v4 } from 'uuid';

export const useBindingsStore = defineStore('bindings', {
  state: () => ({
    entries: [] as Entry[],
  }),
  getters: {
    getAll: ({ entries }) => entries,
    getAvailableStatuses: ({ entries }) =>
      new Set(entries.map((e) => e.status)),
    getFieldsByStatus:
      ({ entries }) =>
      (status: statuses) =>
        entries.filter((e) => e.status === status),
  },
  actions: {
    addLocalFiles(files: FileList) {
      const newFiles = [...files].map((f) => ({
        file: f,
        status: statuses.PENDING,
        id: v4(),
        filename: f.name,
        duration: null,
      }));
      this.$patch({
        entries: [...newFiles, ...this.entries],
      });
    },
    submit(id: string) {
      const toSubmit = this.entries
        .filter(
          (e) => e.status === statuses.PENDING || e.status === statuses.ERROR,
        )
        .filter((e) => e.id === id);
      toSubmit.forEach(async (entry) => {
        try {
          entry.status = statuses.PROCESSING;
          await post({ audio: entry.file });
        } catch (e) {
          console.error(e);
          entry.status = statuses.ERROR;
        }
      });

      this.synchronise();
    },
    async submitAll() {
      const toSubmit = this.entries.filter(
        (e) => e.status === statuses.PENDING || e.status === statuses.ERROR,
      );
      await Promise.all(
        toSubmit.map(async (entry) => {
          try {
            entry.status = statuses.PROCESSING;
            await post({ audio: entry.file });
          } catch (e) {
            console.error(e);
            entry.status = statuses.ERROR;
          }
        }),
      );

      this.synchronise();
    },
    async synchronise() {
      const data = await getAll();
      this.$patch({
        entries:
          data?.map((entry) => ({
            id: entry.binding.id,
            duration: entry.audio.audio_length,
            filename: entry.audio.file_name,
            status: statuses.IN_DB,
            file: new File([], entry.audio.file_name),
          })) || [],
      });
    },
    async deleteAll() {
      await Promise.all(
        this.entries.map((entry) => deleteOne({ id: entry.id })),
      );
      this.synchronise();
      this.entries = [];
    },
    async delete(id: string) {
      const item = this.entries.find((entry) => entry.id == id);
      if (!item)
        throw new Error(`Item with id ${id} not found in store somehow`);
      if (item.status === statuses.IN_DB) {
        await deleteOne({ id });
      }
      this.entries = this.entries.filter((entry) => entry.id !== id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBindingsStore, import.meta.hot));
}
