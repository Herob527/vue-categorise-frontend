import { defineStore } from 'pinia';
import { v4 } from 'uuid';

export enum Statuses {
  PENDING,
  PROCESSING,
  IN_DB,
  ERROR,
}

type Entry = {
  page: number;
  duration?: number;
  status: Statuses;
  file: File;
  id: string;
};

type LocalEntry = {
  id: string;
  page: number;
  duration?: number;
  status: Statuses.PENDING | Statuses.ERROR | Statuses.PROCESSING;
  file: File;
};

type RemoteEntry = {
  id: string;
  page: number;
  duration?: number;
  status: Statuses.IN_DB;
  file: File;
};

type ParamInput = LocalEntry | RemoteEntry;

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
    addFiles(data: ParamInput[]) {
      data.forEach((entry) => this.addFile(entry));
    },
    removeFiles(status: Statuses, ids: string[]) {
      ids.forEach((id) => this.removeFile(status, id));
    },
    updateStatus(id: string, status: Statuses, newData: Partial<Entry>) {
      const currentStatusData = this.$state.map.get(status) ?? [];
      const entry = currentStatusData.findIndex((e) => e.id === id);
      const newEntry = { ...currentStatusData[entry], ...newData };
      currentStatusData[entry] = newEntry;
      this.$state.map.set(status, [...currentStatusData]);
    },
    addFile(data: ParamInput) {
      const { status } = data;
      const currentStatusData = this.$state.map.get(status) ?? [];
      const id = data.id;
      const newData = [...currentStatusData, { ...data, id }];
      this.$state.map.set(status, newData);
    },
    removeFile(status: Statuses, id: string) {
      this.$state.map.set(
        status,
        (this.$state.map.get(status) ?? []).filter((e) => e.id !== id),
      );
    },
  },
});
