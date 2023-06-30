import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useAudioFilesStore = defineStore('files', () => {
  const files: Ref<File[]> = ref([]);

  const add = (file: File) => {
    const isFileThere = !!files.value.find(
      (fileEntry) => file.name === fileEntry.name,
    );
    if (isFileThere) return;
    files.value.push(file);
  };

  const remove = (file: File) => {
    files.value = files.value.filter((entry) => entry.name === file.name);
  };

  const purge = () => (files.value = []);

  const getAll = () => files.value;

  const getSpecificFile = (name: string) =>
    files.value.filter((entry) => entry.name === name);

  return {
    add,
    remove,
    purge,
    getAll,
    getSpecificFile,
  };
});
