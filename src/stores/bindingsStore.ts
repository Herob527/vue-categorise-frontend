import { acceptHMRUpdate, defineStore } from 'pinia';
import { deleteOne, post } from '@/actions/bindings';
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
      (status: statuses, page: number = 1) =>
        entries.filter((e) => e.status === status && e.page === page),
  },
  actions: {
    addDbFiles(
      data: { filename: string; duration: number; id: string; page: number }[],
    ) {
      const dataForStore = data
        .map((entry) => {
          const { filename, id, duration, page } = entry;
          const file = new File([], filename);
          return {
            page,
            file,
            id,
            duration,
            filename,
            status: statuses.IN_DB,
          };
        })
        .filter((entry) => !this.entries.some((it) => it.id === entry.id));

      this.$patch({
        entries: [...dataForStore, ...this.entries],
      });
    },
    addLocalFiles(files: FileList) {
      const newFiles = [...files].map((f) => ({
        file: f,
        status: statuses.PENDING,
        id: v4(),
        filename: f.name,
        duration: null,
      }));
      console.log(newFiles)
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
    },
    async deleteAll() {
      await Promise.all(
        this.entries.map((entry) => deleteOne({ id: entry.id })),
      );
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
