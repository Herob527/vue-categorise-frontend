import { defineStore } from 'pinia';

export enum Statuses {
  PENDING,
  PROCESSING,
  IN_DB,
  ERROR,
}

type Entry = {
  id: string;
  page: number;
  duration?: number;
  status: Statuses;
  file: File;
};

export const useBindingsStoreV2 = defineStore('bingingsV2', {
  state: () => ({ map: new Map<Statuses, Entry[]>() }),
  getters: {
    getAll: (store) => {
      return [...store.map.values()].flat();
    },
    getFieldsByStatus:
      (store) =>
      (status: Statuses, page: number = 0) =>
        store.map.get(status)?.filter((e) => e.page === page) ?? [],
    getFieldById: (store) => (id: string) => {
      const [status, value] =
        [...store.map.entries()]
          .filter(([, items]) => items.find((entry) => entry.id === id))
          .at(0) ?? [];
      return { status, value: value?.at(0) };
    },
  },
  actions: {
    addFiles(data: Entry[]) {
      data.forEach((entry) => this.addFile(entry));
    },
    removeFiles(ids: string[]) {
      ids.forEach((id) => this.removeFile(id));
    },
    updateStatus(id: string, newStatus: Statuses) {
      const { status: oldStatus, value } = this.getFieldById(id);
      if (oldStatus === undefined || value === undefined)
        throw new Error('File not found');
      this.removeFile(id);
      this.addFile({ ...value, status: newStatus });
    },
    updateFileData(id: string, newData: Partial<Entry>) {
      const { status, value } = this.getFieldById(id);
      if (status === undefined || value === undefined)
        throw new Error('File not found');
      const newEntry = { ...value, ...newData };
      const currentStatusData = this.$state.map.get(status) ?? [];
      const newDataList = currentStatusData.map((e) =>
        e.id === id ? newEntry : e,
      );
      this.$state.map.set(status, newDataList);
    },
    addFile(data: Entry) {
      const { status, id } = data;
      const currentStatusData = this.$state.map.get(status) ?? [];
      const newData = [...currentStatusData, { ...data, id }];
      this.$state.map.set(status, newData);
    },
    removeFile(id: string) {
      const { status } = this.getFieldById(id);
      if (status === undefined) throw new Error('File not found');

      this.$state.map.set(
        status,
        (this.$state.map.get(status) ?? []).filter((e) => e.id !== id),
      );
    },
  },
});
