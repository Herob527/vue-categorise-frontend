<script setup lang="ts">
import FileEntry from './FileEntry.vue';
import { useAudioFilesStore } from '@/stores/audioFiles';
import type { fileEntry } from '@/stores/audioFiles';
import { useCategoriesStore } from '@/stores/categories';
import { ref } from 'vue';

const store = useAudioFilesStore();
const { useRemoveCategory } = useCategoriesStore();
const { mutate, isLoading } = useRemoveCategory();
const { getFilesByCategory, add, remove } = store;

type categoryProps = {
  category: {
    id: string;
    name: string;
  };
};

const prop = defineProps<categoryProps>();
const allFilesInCategory = ref<fileEntry[]>([]);

store.$subscribe(() => {
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

const handleClear = () => {
  allFilesInCategory.value.forEach((file) => {
    remove(file.id);
  });
};

const handleRemoveCategory = () => {
  mutate(prop.category.name, {
    onSuccess: () => {
      handleClear();
    },
  });
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
  <div class="p-4 bg-gray-300 rounded-xl">
    <div class="flex flex-row gap-2 items-center">
      <button
        @click="handleClick"
        title="Add files to category"
        type="button"
        class="flex flex-col justify-center items-center p-1 w-8 h-8 text-white bg-blue-500 rounded-md hover:bg-blue-700"
      >
        <i>+</i>
      </button>
      <button
        @click="handleClear"
        class="flex flex-col justify-center items-center p-1 w-8 h-8 text-white bg-blue-500 rounded-md hover:bg-blue-700"
        title="Clear category"
      >
        <!-- Add Icons using String format -->

        <font-awesome-icon icon="fa-trash-can" />
      </button>
      <button
        @dblclick="handleRemoveCategory"
        class="flex flex-col justify-center items-center p-1 w-8 h-8 text-white bg-red-500 rounded-md hover:bg-red-700"
        title="Remove category (click two times)"
      >
        <font-awesome-icon icon="fa-xmark" />
      </button>
      <span>{{ category.name }}</span>
    </div>
    <div
      v-if="allFilesInCategory.length > 0"
      class="p-4 mt-4 bg-white rounded-md"
    >
      <FileEntry
        v-for="audio in allFilesInCategory"
        :key="audio.id"
        :audio="audio"
      />
    </div>
  </div>
</template>
