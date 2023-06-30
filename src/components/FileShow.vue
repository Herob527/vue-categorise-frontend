<script setup lang="ts">
import { useAudioFilesStore } from '../stores/audioFiles';
const store = useAudioFilesStore();
const allFiles = store.getAll();
</script>

<template>
  <div v-for="file in allFiles" :key="file.name">
    <span> {{ file.name }} </span>
  </div>
</template>
