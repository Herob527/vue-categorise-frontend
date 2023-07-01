import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

type fileEntry = {
  file: File;
  id: string;
  category: string;
};

export const useAudioFilesStore = defineStore('files', () => {
  const files: Ref<fileEntry[]> = ref([]);

  const add = (file: File, id: string, category: string = 'Unknown') => {
    const isFileThere = !!files.value.find((fileEntry) => id === fileEntry.id);
    if (isFileThere) return false;
    files.value.push({ file, id, category });
    return true;
  };

  const remove = (id: string) => {
    files.value = files.value.filter((entry) => entry.id === id);
  };

  const purge = () => (files.value = []);

  const getAll = () => files.value;

  const getSpecificFile = (id: string) =>
    files.value.filter((entry) => entry.id === id);

  return {
    add,
    remove,
    purge,
    getAll,
    getSpecificFile,
  };
});
