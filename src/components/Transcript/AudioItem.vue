<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import { type AudioModel } from '@/types/generated';

const { audioData } = defineProps<{
  audioData: AudioModel;
  className?: string;
}>();

const splitUrl = audioData.url.split('/').slice(1).join('/');

const fullUrl = `http://localhost:8000/static/${splitUrl}`;
const wsInstance = ref<WaveSurfer | null>(null);
const wsContainer = ref(null);

const init = () => {
  if (wsContainer.value === null) return;
  const wavesurfer = WaveSurfer.create({
    container: wsContainer.value,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    url: fullUrl,
  });

  wavesurfer.on('click', () => {
    wavesurfer.playPause();
  });
  wsInstance.value = wavesurfer;
};
onMounted(() => init());
onUnmounted(() => {
  wsInstance.value?.unAll();
  wsInstance.value?.empty();
  wsInstance.value?.stop();
  wsInstance.value?.destroy();
  wsInstance.value = null;
});
</script>
<template>
  <div ref="wsContainer" :class="`${className || ''}`.trim()"></div>
</template>
