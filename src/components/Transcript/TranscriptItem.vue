<script setup lang="ts">
import AudioItem from './AudioItem.vue';
import CategoryItem from './CategoryItem.vue';
import TextItem from './TextItem.vue';
import { type BindingModel } from '@/types/generated';

defineProps<{
  entry: BindingModel;
}>();
</script>
<template>
  <div class="flex flex-row gap-2">
    <span class="flex-1">{{ entry.audio.file_name }}</span>
    <AudioItem :audioData="entry.audio" class="flex-1" />
    <TextItem :textData="entry.text" class="flex-1" />
    <CategoryItem
      :categoryData="entry.category"
      class="flex-1 p-2 rounded-xl border-2 h-min border-primary-500"
    />
  </div>
</template>
