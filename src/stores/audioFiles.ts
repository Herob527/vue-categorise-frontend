import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export type fileEntry = {
  file: File;
  id: string;
  category: string;
};

export const useAudioFilesStore = defineStore('files', () => {
  const files: Ref<fileEntry[]> = ref([]);
  const add = (file: File, id: string, category: string = 'Unknown') => {
    const isFileThere = !!files.value.find((fileEntry) => id === fileEntry.id);
    if (isFileThere || !file.type.includes('audio')) return false;
    files.value.push({ file, id, category });

    return true;
  };

  const remove = (id: string) => {
    const filteredValues = files.value.filter((entry) => {
      return entry.id !== id;
    });
    files.value = filteredValues;
  };

  const purge = () => (files.value = []);

  const getAll = () => files.value;

  const getSpecificFile = (id: string) =>
    files.value.filter((entry) => entry.id === id);

  const getFilesByCategory = (category: string) =>
    files.value.filter((file) => file.category === category);

  return {
    add,
    remove,
    purge,
    getAll,
    getSpecificFile,
    getFilesByCategory,
    files,
  };
});
