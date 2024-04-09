<script setup lang="ts">
import type { statuses } from '@/types/shared';
import { STATUS_COLORS } from '@/constants';

const { status } = defineProps<{ status: `${statuses}` }>();
</script>
<template>
  <span
    :style="`background-color: ${STATUS_COLORS[status] || STATUS_COLORS.inDatabase}`"
    class="absolute top-1/2 left-1/2 py-3 px-3 rounded-full -translate-x-1/2 -translate-y-1/2"
    :title="status"
  ></span>
</template>
