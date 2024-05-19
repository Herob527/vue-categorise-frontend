<script setup lang="ts">
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import FileIcon from './FileIcon.vue';

type FileShape = {
  fileName: string;
  isDirectory: false;
};

type DirectoryShape = {
  dirName: string;
  files: FileShape[];
  isDirectory: true;
};

type DataProp = FileShape | DirectoryShape;

const props = defineProps<{ name: string; data: DataProp[]; depth?: number }>();

const isOpen = ref(true);

const dataSize = props.data.length;
</script>
<template>
  <div :class="`flex flex-col ${depth ? 'ml-2' : ''}`">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex gap-2 items-center"
    >
      <font-awesome-icon width="16" :icon="isOpen ? faFolderOpen : faFolder" />
      <span>{{ name }}</span>
    </button>
    <div v-if="isOpen" class="ml-1.5">
      <div
        v-for="entry in data"
        :key="entry.isDirectory ? entry.dirName : entry.fileName"
        class="flex relative gap-2 border-l-2 border-black"
      >
        <template v-if="entry.isDirectory === false">
          <div class="flex flex-row flex-1 gap-2 items-center ml-2">
            <FileIcon :file-name="entry.fileName" />
            <span>{{ entry.fileName }} </span>
          </div>
        </template>
        <template v-else>
          <DirectoryItem
            :name="entry.dirName"
            :data="entry.files"
            :depth="depth ? depth + 1 : 1"
          />
        </template>
      </div>
    </div>
  </div>
</template>
