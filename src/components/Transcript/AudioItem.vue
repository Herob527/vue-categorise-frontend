<script setup lang="ts">
import { onUnmounted, ref, watch, type ComponentPublicInstance } from 'vue';
import WaveSurfer from 'wavesurfer.js';
import { type AudioModel } from '@/types/generated';
import { useQuery } from '@tanstack/vue-query';
import { getOne } from '@/actions/audios';

const props = withDefaults(
  defineProps<{
    audioData: AudioModel;
    className?: string;
  }>(),
  { className: undefined },
);

const { data, isLoading } = useQuery({
  queryFn: async () => getOne(props.audioData.id),
  queryKey: ['audio', props.audioData.id],
});

const wsInstance = ref<WaveSurfer | null>(null);
const wsContainer = ref<ComponentPublicInstance<HTMLDivElement> | null>(null);

const AUDIO_LENGTH_THRESHOLD = 100;

const init = async () => {
  if (wsContainer.value === null || data.value === undefined) return;
  const wavesurfer = WaveSurfer.create({
    container: wsContainer.value,
    waveColor: '#2196f3',
    progressColor: '#0d47a1',
  });
  await wavesurfer.loadBlob(data.value);
  // TODO: Redirect generating peaks to backend or web worker
  if (
    props.audioData.audio_length !== null &&
    props.audioData.audio_length > AUDIO_LENGTH_THRESHOLD
  ) {
    wavesurfer.setOptions({
      peaks: [],
    });
  }

  wavesurfer.on('click', () => {
    void wavesurfer.playPause();
  });
  wsInstance.value = wavesurfer;
};

watch([() => isLoading.value, () => data.value], async () => {
  if (!isLoading.value && wsInstance.value === null) {
    await init();
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
    :class="`min-h-[140px] ${className || ''}`.trim()"></div>
</template>
