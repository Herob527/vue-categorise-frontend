<script setup lang="ts">
import type { Status } from '@/types/shared';
import { STATUS_COLORS } from '@/constants';

const props = withDefaults(defineProps<{ status?: `${Status}` }>(), {
  status: undefined,
});

const status = props.status;
</script>
<template>
  <span
    :style="`background-color: ${status ? STATUS_COLORS[status] : STATUS_COLORS.inDatabase}`"
    class="absolute top-1/2 left-1/2 py-3 px-3 rounded-full -translate-x-1/2 -translate-y-1/2"
    :title="status"></span>
</template>
