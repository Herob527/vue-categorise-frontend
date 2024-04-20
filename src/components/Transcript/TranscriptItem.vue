<script setup lang="ts">
import AudioItem from './AudioItem.vue';

const props = defineProps<{
  fileName: string;
  audioId: string;
  duration: number;
  dataUrl: string;
}>();

const fullUrl = `http://localhost:8000/static/${props.dataUrl.replace('audios/', '')}`;
</script>
<template>
  <div class="flex flex-row gap-2">
    <span>{{ fileName }}</span>
    <AudioItem :full-url="fullUrl" />
  </div>
</template>
