<script setup lang="ts">
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import FileIcon from './FileIcon.vue';
import type { DataProp } from '@/types/shared';

defineProps<{ name: string; data: DataProp[]; depth?: number }>();

const isOpen = ref(true);
</script>
<template>
  <div
    :class="`flex flex-col ${depth ? 'ml-2' : 'border-black border-2 p-2 rounded-xl'}`"
  >
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex gap-2 items-center py-1 px-2 rounded-xl hover:text-white hover:bg-primary-500"
    >
      <font-awesome-icon width="16" :icon="isOpen ? faFolderOpen : faFolder" />
      <span>{{ name }}</span>
    </button>
    <div v-if="isOpen" class="flex flex-col flex-wrap ml-1.5">
      <div
        v-for="entry in data"
        :key="entry.isDirectory ? entry.dirName : entry.fileName"
        class="flex relative gap-2"
      >
        <template v-if="entry.isDirectory === false">
          <div class="flex flex-row flex-1 gap-2 items-center py-1 px-2 ml-2">
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
