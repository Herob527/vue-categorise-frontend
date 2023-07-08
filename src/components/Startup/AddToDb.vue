<script setup lang="ts">
import { useBindings } from '@/hooks/useBindings';
import { useAudioFilesStore } from '@/stores/audioFiles';
import { ref } from 'vue';

const error = ref<string[]>([]);
const success = ref<string[]>([]);

const { getAll } = useAudioFilesStore();

const { usePostBinding } = useBindings();

const { mutate, isError } = usePostBinding();

const handleClick = async () => {
  const promises = [...getAll().value.values()].map((value) =>
    mutate({ category: value.category, audio: value.file }),
  );
  const settledPromises = await Promise.allSettled(promises);
  console.log(settledPromises);
};
</script>

<template>
  <div
    class="container inline-flex flex-col gap-4 justify-center items-center p-4 mx-auto bg-gray-200 rounded-xl"
  >
    <button
      @click="handleClick"
      type="button"
      class="p-2 text-white bg-blue-500 rounded-xl border-2 transition-colors hover:bg-blue-600"
    >
      <span>Put everything to DB</span>
    </button>
  </div>
</template>
