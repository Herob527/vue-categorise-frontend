import { acceptHMRUpdate, defineStore } from 'pinia';
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
    addFiles(files: FileList | File[], category?: string) {
      const newFiles = [...files].map((f) => ({
        file: f,
        status: statuses.PENDING,
        id: v4(),
        filename: f.name,
        duration: null,
        category,
      }));
      this.entries = [...newFiles, ...this.entries];
    },
    updateFileStatus(id: string, status: statuses) {
      const index = this.entries.findIndex((entry) => entry.id == id);
      if (index === undefined) return;

      this.entries[index].status = status;
    },
    removeAll() {
      this.entries = [];
    },
    remove(id: string) {
      const item = this.entries.find((entry) => entry.id == id);
      if (!item)
        throw new Error(`Item with id ${id} not found in store somehow`);
      this.entries = this.entries.filter((entry) => entry.id !== id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBindingsStore, import.meta.hot));
}
