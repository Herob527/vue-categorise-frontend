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
    const isFileThere = filesMap.value.has(id);
    const isFileAudio = file.type.includes('audio');
    console.group('[add]');
    console.log(isFileThere);
    console.log(isFileAudio);
    console.log(file);
    console.groupEnd();
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
  const updateStatus = (id: string, newStatus: fileEntry['status']) => {
    const currentFile = getSpecificFile(id);
    if (currentFile === undefined)
      throw new Error(`File entry with id '${id}' not found`);
    filesMap.value.set(id, { ...currentFile, status: newStatus });
  };
  return {
    add,
    remove,
    purge,
    getAll,
    getSpecificFile,
    getFilesByCategory,
    filesMap,
    updateStatus,
  };
});
