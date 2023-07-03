<script setup lang="ts">
import type { fileEntry } from '@/stores/audioFiles';
import { convert } from 'convert';
import { ref } from 'vue';

type propTypes = {
  audio: fileEntry;
};
const length = ref(0);
const getDuration = async (file: fileEntry['file']) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = async (e) => {
    const ctx = new AudioContext();
    if (!e.target) return;
    const audioArrayBuffer = e.target.result as ArrayBuffer;
    return await ctx.decodeAudioData(
      audioArrayBuffer,
      (data) => {
        length.value = Math.round(data.duration * 100) / 100;
      },
      (error) => {
        return null;
      },
    );
  };
};
const props = defineProps<propTypes>();
const bestUnit = convert(props.audio.file.size, 'B').to('best').toString(2);
getDuration(props.audio.file);
</script>
<template>
  <div class="grid grid-cols-5 gap-2 text-center">
    <span>{{ audio.file.name }}</span>
    <span>{{ bestUnit }}</span>
    <span>{{ length === 0 ? 'Calculating length...' : `${length} s` }} </span>
  </div>
</template>
