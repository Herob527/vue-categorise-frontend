<script setup lang="ts">
import { useFinalisePreviewStore } from '@/stores/previewStore';
import DirectoryItem from './DirectoriesPreview/DirectoryItem.vue';
import type { DataProp, FileShape } from '@/types/shared';

const { fakeCategories, fakeData } = useFinalisePreviewStore();

const getDataForCategory = (category: string) =>
  fakeData
    .filter((d) => d.category === category)
    .map(
      (entry) =>
        ({ fileName: entry.fileName, isDirectory: false }) satisfies FileShape,
    );

const getDataProps = (category: string) =>
  [
    {
      dirName: 'wavs',
      files: getDataForCategory(category),
      isDirectory: true,
    },
    {
      fileName: 'transcript.txt',
      isDirectory: false,
    },
  ] satisfies DataProp[];
</script>

<template>
  <div class="flex flex-col">
    <DirectoryItem
      v-for="category in fakeCategories"
      :key="category"
      :name="category"
      :data="getDataProps(category)"
    />
  </div>
</template>
