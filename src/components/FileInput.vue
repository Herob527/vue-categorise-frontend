<script setup lang="ts">
import { ref } from 'vue';
import { useAudioFilesStore } from '@/stores/audioFiles';

const fileInputRef = ref<HTMLInputElement>();
const audioFiles = useAudioFilesStore();

const handleChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files || []);
  files.forEach((file) => audioFiles.add(file));
};
</script>

<template>
  <input
    @change="handleChange"
    type="file"
    ref="fileInputRef"
    accept="audio/*"
    multiple
  />
</template>
