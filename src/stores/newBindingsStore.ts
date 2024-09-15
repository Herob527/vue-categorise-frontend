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
  page: number;
  duration?: number;
  status: Statuses.PENDING | Statuses.ERROR | Statuses.PROCESSING;
  file: File;
};

type RemoteEntry = {
  page: number;
  id: string;
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
  },
  actions: {
    updateStatus(id: string, status: Statuses) {
      const currentStatusData = this.$state.map.get(status) ?? [];
    },
    addFiles(data: ParamInput[]) {
      data.forEach((entry) => this.addFile(entry));
    },
    removeFiles(status: Statuses, ids: string[]) {
      ids.forEach((id) => this.removeFile(status, id));
    },
    addFile(data: ParamInput) {
      const { status } = data;
      const currentStatusData = this.$state.map.get(status) ?? [];
      const id = status === Statuses.IN_DB ? data.id : v4();
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
