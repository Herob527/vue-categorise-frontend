<script setup lang="ts">
import { type fileEntry } from '@/stores/audioFiles';

type propTypes = {
  status: fileEntry['status'];
};

const props = defineProps<propTypes>();
console.log(props);
const colors: Record<(typeof props)['status'], string> = {
  done: 'bg-green-500',
  error: 'bg-red-500',
  pending: 'bg-blue-500',
  onServer: 'bg-yellow-500',
  processing: 'bg-orange-500',
};
const currentColor = colors[props.status];
console.log(currentColor);
</script>
<template>
  <div class="flex gap-2 justify-center items-center">
    <span
      :class="currentColor"
      class="inline-block w-4 h-4 rounded-full"
    ></span>
    <span>{{ status }}</span>
  </div>
</template>
