<script setup lang="ts">
import type { fileEntry } from '@/stores/audioFiles';

type propTypes = {
  audio: fileEntry;
};
const props = defineProps<propTypes>();
</script>
<template>
  <p>{{ audio.file.name }}</p>
</template>
