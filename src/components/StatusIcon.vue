<script setup lang="ts">
import type { statuses } from '@/types/shared';

const { status } = defineProps<{ status: `${statuses}` }>();

const colors: Record<`${statuses}`, string> = {
  error: 'red',
  pending: 'yellow',
  processing: 'blue',
  inDatabase: 'orange',
};
</script>
<template>
  <span
    :style="`background-color: ${colors[status] || colors.inDatabase}`"
    class="absolute top-1/2 left-1/2 py-3 px-3 rounded-full -translate-x-1/2 -translate-y-1/2"
    :title="status"
  ></span>
</template>
