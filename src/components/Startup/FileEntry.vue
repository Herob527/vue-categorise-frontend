<script setup lang="ts">
import { useAudioFilesStore, type fileEntry } from '@/stores/audioFiles';
import StatusIndicator from './StatusIndicator.vue';
import { convert } from 'convert';

type propTypes = {
  audio: fileEntry;
  id: string;
};

const props = defineProps<propTypes>();
const bestUnit = convert(props.audio.file.size, 'B').to('best').toString(2);

const { remove } = useAudioFilesStore();

const handleRemoveAudio = () => {
  remove(props.id);
};
</script>
<template>
  <div
    class="grid grid-cols-5 gap-2 justify-items-center items-center text-center"
  >
    <span> {{ audio.file.name }} </span>
    <span> {{ bestUnit }} </span>
    <span> <StatusIndicator :status="props.audio.status" /> </span>
    <div
      class="flex flex-row col-start-5 col-end-5 gap-2 justify-end items-end"
    >
      <button
        type="button"
        @click="handleRemoveAudio"
        class="flex flex-col justify-center items-center w-8 h-8 text-white bg-red-500 rounded-md hover:bg-red-700"
        title="Remove audio"
      >
        <font-awesome-icon icon="fa-xmark" />
      </button>
    </div>
  </div>
</template>
