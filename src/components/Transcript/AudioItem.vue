<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import { type AudioModel } from '@/types/generated';
import { useQuery } from '@tanstack/vue-query';
import { getOne } from '@/actions/audios';

const { audioData } = defineProps<{
  audioData: AudioModel;
  className?: string;
}>();

const { data, isLoading } = useQuery({
  queryFn: async () => getOne(audioData.id),
  queryKey: ['audio', audioData.id],
});

const wsInstance = ref<WaveSurfer | null>(null);
const wsContainer = ref(null);

const AUDIO_LENGTH_THRESHOLD = 100;

const init = () => {
  if (
    wsContainer.value === null ||
    data.value === null ||
    data.value === undefined
  )
    return;
  const wavesurfer = WaveSurfer.create({
    container: wsContainer.value,
    waveColor: '#2196f3',
    progressColor: '#0d47a1',
  });
  wavesurfer.loadBlob(data.value);
  // TODO: Redirect generating peaks to backend or web worker
  if (audioData.audio_length > AUDIO_LENGTH_THRESHOLD) {
    wavesurfer.setOptions({
      peaks: [],
    });
  }

  wavesurfer.on('click', () => {
    wavesurfer.playPause();
  });
  wsInstance.value = wavesurfer;
};

watch([() => isLoading.value, () => data.value], () => {
  if (!isLoading.value && wsInstance.value === null) {
    init();
  }
});
onUnmounted(() => {
  wsInstance.value?.destroy();
  wsInstance.value = null;
});
</script>
<template>
  <div
    ref="wsContainer"
    :class="`${className || ''}`.trim()"></div>
</template>
