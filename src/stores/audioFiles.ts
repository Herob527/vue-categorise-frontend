import { defineStore } from 'pinia';
import { ref } from 'vue';

export type fileEntry = {
  file: File;
  category: string;
  status: 'pending' | 'processing' | 'done' | 'error' | 'onServer';
};

export const useAudioFilesStore = defineStore('files', () => {
  const filesMap = ref(new Map<string, fileEntry>());

  const add = (
    file: File,
    id: string,
    category: string = 'Unknown',
    status: fileEntry['status'] = 'pending',
  ) => {
    console.group('[add]');
    console.log(file);
    console.log(id);
    console.log(category);
    console.log(status);
    console.groupEnd();
    const isFileThere = filesMap.value.has(id);
    const isFileAudio = file.type.includes('audio');
    if (isFileThere || !isFileAudio) return false;
    filesMap.value.set(id, { category, file, status });
    return true;
  };

  const remove = (id: string) => {
    filesMap.value.delete(id);
  };

  const purge = () => filesMap.value.clear();

  const getAll = () => filesMap;

  const getSpecificFile = (id: string) => filesMap.value.get(id);

  const getFilesByCategory = (category: string) => {
    const filteredEntries = [...filesMap.value.entries()].filter(
      ([key, value]) => value.category === category,
    );
    return new Map(filteredEntries);
  };

  return {
    add,
    remove,
    purge,
    getAll,
    getSpecificFile,
    getFilesByCategory,
    filesMap,
  };
});
