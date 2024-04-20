<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import WaveSurfer from 'wavesurfer.js';

const props = defineProps<{ fullUrl: string }>();

const wsInstance = ref<WaveSurfer | null>(null);
const wsContainer = ref(null);

const init = () => {
  if (wsContainer.value === null) return;
  const wavesurfer = WaveSurfer.create({
    container: wsContainer.value,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    url: props.fullUrl,
  });

  wavesurfer.on('click', () => {
    wavesurfer.playPause();
  });
  wsInstance.value = wavesurfer;
};
onMounted(init);
onUnmounted(() => {
  wsInstance.value?.destroy();
});
</script>
<template>
  <div ref="wsContainer" class="w-64 h-64"></div>
</template>
