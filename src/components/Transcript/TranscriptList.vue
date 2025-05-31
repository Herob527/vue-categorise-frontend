<script setup lang="ts">
import type { BindingModel } from '@/types/generated';
import TranscriptItem from './TranscriptItem.vue';

defineProps<{
  data: BindingModel[];
}>();
</script>
<template>
  <div class="flex flex-row gap-4">
    <div class="flex flex-col flex-1 gap-2">
      <TranscriptItem
        v-for="entry in data"
        :key="entry.binding.id"
        :entry="entry" />
    </div>
  </div>
</template>
