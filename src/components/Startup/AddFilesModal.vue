<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';

import { faFileImport, faXmark } from '@fortawesome/free-solid-svg-icons';

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInput');

const handleFileClick = () => {
  fileInputRef.value?.click();
};

const input = ref('');

const dummyCategoryList = computed(() =>
  Array(20)
    .fill('Category')
    .map((text, index) => `${text} ${index}`)
    .filter((text) =>
      input.value.trim() === ''
        ? true
        : text.toLowerCase().includes(input.value.toLowerCase()),
    ),
);

const isInCollection = computed(() => {
  if (input.value === '') return false;
  return dummyCategoryList.value.some(
    (text) => text.toLowerCase() === input.value.trim().toLowerCase(),
  );
});
const files = ref<File[]>([]);
</script>

<template>
  <div class="bg-white text-black p-2 flex flex-col gap-2 min-w-md">
    <section class="flex-1">
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        multiple
        @change="
          (event) => {
            const target = event.target as HTMLInputElement;
            if (target.files) {
              files.push(...Array.from(target.files));
            }
          }
        " />
      <button
        class="hover:cursor-pointer flex items-center flex-col justify-center w-full bg-primary-500 text-white p-4 h-full hover:bg-primary-600 gap-4"
        @click="handleFileClick">
        <font-awesome-icon
          :icon="faFileImport"
          size="2xl" />
        <span>Add files</span>
      </button>
    </section>
    <section class="flex flex-col gap-2 p-2 border-4 border-primary-500 flex-1">
      <h2 class="text-xl font-bold">Category</h2>
      <div class="bg-white flex flex-row flex-nowrap">
        <input
          v-model="input"
          maxlength="50"
          class="p-2 text-black w-full border-2 border-primary-600 border-r-0 outline-none" />
        <button
          type="button"
          class="bg-red-500 text-white px-4 relative hover:cursor-pointer hover:bg-red-700 border-red-600 border-2 border-l-0"
          @click="input = ''">
          <font-awesome-icon
            :icon="faXmark"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
        </button>
      </div>
      <div
        v-if="dummyCategoryList.length > 0"
        class="flex flex-col gap-2 p-2 border-primary-600 bg-white border-2 text-white max-h-48 overflow-y-scroll">
        <button
          v-for="category in dummyCategoryList"
          :key="category"
          class="p-2 border-2 bg-primary-500 hover:bg-primary-600 cursor-pointer"
          @click="input = category">
          {{ category }}
        </button>
      </div>

      <template v-if="input.length > 0">
        <span v-if="isInCollection"
          >Category
          <code class="border-2 border-gray-500 p-1 rounded-md">{{
            input.trim()
          }}</code>
          will be
          <b>reused</b></span
        >
        <span v-else>
          Category
          <code class="border-2 border-gray-500 p-1 rounded-md">{{
            input.trim()
          }}</code>
          will be <b>created</b></span
        >
      </template>
      <span v-else> Files will be <b>uncategorized</b> </span>
      <button
        type="button"
        class="p-2 border-2 bg-primary-500 hover:bg-primary-600 cursor-pointer text-white">
        <span v-if="files.length === 0"> Submit </span>
        <span v-else> Submit ({{ files.length }} files)</span>
      </button>
    </section>
  </div>
</template>
