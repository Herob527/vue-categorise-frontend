<script setup lang="ts">
import { useBindings } from '@/hooks/useBindings';
import { useAudioFilesStore } from '@/stores/audioFiles';
import { generateId } from '@/utils/generateId';

const { getAll, updateStatus } = useAudioFilesStore();

const { usePostBinding } = useBindings();

const { mutateAsync } = usePostBinding();

const handleClick = async () => {
  const promises = [...getAll().value.values()].map((value) => {
    const allowedValues = ['pending', 'processing'];
    if (!allowedValues.includes(value.status)) return;
    const id = generateId(value.file);
    updateStatus(id, 'processing');
    return mutateAsync({ category: value.category, audio: value.file });
  });
  const settledPromises = await Promise.allSettled(promises);

  const failedPromises = settledPromises.filter(
    (el) => el.status === 'rejected',
  ) as PromiseRejectedResult[];
  const resolvedPromises = settledPromises.filter(
    (el) => el.status === 'fulfilled',
  ) as PromiseFulfilledResult<unknown>[];

  failedPromises.forEach((el) => {
    const data: File = el.reason.config.data.get('audio');
    const id = generateId(data);
    updateStatus(id, 'error');
  });
  resolvedPromises.forEach(() => {
    const filesWithoutError = [...getAll().value.values()];
    filesWithoutError
      .filter((el) => el.status === 'processing')
      .forEach((el) => {
        const id = generateId(el.file);
        updateStatus(id, 'done');
      });
  });
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
