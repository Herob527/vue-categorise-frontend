<script setup lang="ts">
import { useBindings } from '@/hooks/useBindings';
import { useAudioFilesStore } from '@/stores/audioFiles';
import { generateId } from '@/utils/generateId';

const { getAll, updateStatus } = useAudioFilesStore();

const { usePostBinding } = useBindings();

const { mutateAsync } = usePostBinding();

const handleClick = async () => {
  const promises = [...getAll().value.values()].map(
    (value) =>
      value.status !== 'onServer' &&
      value.status !== 'done' &&
      mutateAsync(
        { category: value.category, audio: value.file },
        {
          onError: (err, variables) => {
            const { audio } = variables;
            const fileId = generateId(audio);
            updateStatus(fileId, 'error');
          },
          onSuccess: (data, variables) => {
            const { audio } = variables;
            const fileId = generateId(audio);
            updateStatus(fileId, 'done');
          },
        },
      ),
  );
  const settledPromises = await Promise.allSettled(promises);
  console.group('[Settled promises]');
  settledPromises
    .filter((el) => el.status === 'fulfilled')
    .forEach((el) => {
      console.log(el);
    });
  console.groupEnd();
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
