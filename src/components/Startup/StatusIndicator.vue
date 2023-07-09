<script setup lang="ts">
import { type fileEntry } from '@/stores/audioFiles';
import { ref } from 'vue';

type propTypes = {
  status: fileEntry['status'];
};
const props = defineProps<propTypes>();
const colors: Record<(typeof props)['status'], string> = {
  done: 'bg-green-500',
  error: 'bg-red-500',
  pending: 'bg-blue-500',
  onServer: 'bg-yellow-500',
  processing: 'bg-orange-500',
};
</script>
<template>
  <div class="flex gap-2 justify-center items-center">
    <span
      :class="colors[status]"
      class="inline-block w-4 h-4 rounded-full"
    ></span>
    <span>{{ status }}</span>
  </div>
</template>
