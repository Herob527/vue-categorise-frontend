<script setup lang="ts">
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import FileIcon from './FileIcon.vue';
import type { DataProp } from '@/types/shared';
import EmptyDir from '@/assets/folder-solid-empty.svg?component';

defineProps<{
  name: string;
  data: DataProp[];
  depth?: number;
  isSelected?: boolean;
  selectable?: boolean;
}>();
defineEmits(['select']);

const isOpen = ref(false);
</script>
<template>
  <div
    :class="`flex flex-1 flex-col ${depth ? 'ml-2' : 'border-primary-500 border-2 p-2 rounded-xl'} `">
    <div class="flex gap-2 items-center rounded-md ml-2">
      <template v-if="selectable">
        <input
          type="checkbox"
          :checked="isSelected"
          @change="() => $emit('select', !isSelected)" />
      </template>
      <button
        type="button"
        class="group flex flex-row gap-2 items-center hover:bg-primary-500 hover:text-white px-2 rounded-md py-1 cursor-pointer"
        @click="isOpen = !isOpen">
        <font-awesome-icon
          v-if="data.length > 0"
          width="16"
          :icon="isOpen ? faFolderOpen : faFolder"
          class="group-hover:text-white text-primary-600" />
        <EmptyDir
          v-else
          width="16"
          class="fill-primary-600 group-hover:fill-white" />

        <span>{{ name }}</span>
      </button>
      <span class="flex-1"></span>
      <slot name="buttons" />
    </div>
    <div
      v-if="isOpen"
      class="flex flex-col flex-wrap ml-3.5 border-l-2 border-primary-500">
      <div
        v-for="[index, entry] in Object.entries(data)"
        :key="entry.isDirectory ? entry.dirName : entry.fileName"
        class="flex relative gap-2">
        <template v-if="entry.isDirectory === false">
          <div class="flex flex-row flex-1 gap-2 items-center py-1 px-2 ml-2">
            <FileIcon
              :file-name="entry.fileName"
              :is-even-index="Number(index) % 2 === 0" />
            <span>{{ entry.fileName }} </span>
          </div>
        </template>
        <template v-else>
          <DirectoryItem
            :name="entry.dirName"
            :data="entry.files"
            :depth="depth ? depth + 1 : 1" />
        </template>
      </div>
    </div>
  </div>
</template>
