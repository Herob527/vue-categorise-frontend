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
    <span>{{ entry.audio.file_name }}</span>
    <AudioItem :audioData="entry.audio" />
    <TextItem :textData="entry.text" />
    <CategoryItem :categoryData="entry.category" />
  </div>
</template>
