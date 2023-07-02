<script setup lang="ts">
import FileEntry from './FileEntry.vue';
import { useAudioFilesStore } from '@/stores/audioFiles';
import type { fileEntry } from '@/stores/audioFiles';
import { ref } from 'vue';

const store = useAudioFilesStore();

const { getFilesByCategory, add } = store;

type categoryProps = {
  category: {
    id: string;
    name: string;
  };
};

const prop = defineProps<categoryProps>();
const allFilesInCategory = ref<fileEntry[]>([]);

store.$subscribe((mutation, state) => {
  allFilesInCategory.value = getFilesByCategory(prop.category.name) || [];
});
const fileInputRef = ref<HTMLInputElement>();

const handleClick = () => {
  if (!fileInputRef.value) return;
  fileInputRef.value.click();
};

interface FileEvent extends Event {
  target: HTMLInputElement & { files: File[] };
}

const handleFileInput = (payload: FileEvent) => {
  if (!payload.target) return;
  const { files } = payload.target;
  [...files].forEach((file) =>
    add(file, `${file.name}-${file.lastModified}`, prop.category.name),
  );
};
</script>
<template>
  <input
    @change="handleFileInput($event as FileEvent)"
    type="file"
    accept="audio/*"
    class="hidden"
    ref="fileInputRef"
    multiple
  />
  <div class="p-8 bg-gray-200 rounded-xl">
    <div class="flex flex-row gap-2 items-center">
      <button
        @click="handleClick"
        type="button"
        class="flex flex-col justify-center items-center p-1 w-8 h-8 rounded-md border-2 hover:text-white bg-slate-300 border-slate-400 hover:bg-slate-500"
      >
        <i>+</i>
      </button>
      <span>{{ category.name }}</span>
    </div>
    <div v-for="audio in allFilesInCategory" :key="audio.id">
      <FileEntry />
    </div>
  </div>
</template>
