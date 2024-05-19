<script setup lang="ts">
import { useFinalisePreviewStore } from '@/stores/previewStore';
import DirectoryItem from './DirectoriesPreview/DirectoryItem.vue';

const { fakeCategories } = useFinalisePreviewStore();
</script>

<template>
  <div class="flex flex-col">
    <DirectoryItem
      v-for="category in fakeCategories"
      :key="category"
      :category="category"
    />
  </div>
</template>
