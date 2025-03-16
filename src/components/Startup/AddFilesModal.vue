<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';

import { faFileImport } from '@fortawesome/free-solid-svg-icons';

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInput');

const handleFileClick = () => {
  fileInputRef.value?.click();
};


const input = ref('');

const dummyCategoryList = computed(() => Array(20).fill('Category').map((text, index) => `${text} ${index}`).filter(text => input.value.trim() === '' ? true : text.toLowerCase().includes(input.value.toLowerCase())))

const isInCollection = computed(() => {
  if (input.value === '') return false;
  return dummyCategoryList.value.some((text) => text.toLowerCase() === input.value.trim().toLowerCase());
});
</script>

<template>
  <div class="bg-white text-black p-2 flex flex-col gap-2 min-w-md">
    <section class="flex-1">
      <input ref="fileInput" type="file" class="hidden" multiple />
      <button
        class="hover:cursor-pointer flex items-center flex-col justify-center w-full bg-primary-500 text-white p-4 h-full hover:bg-primary-600 gap-4"
        @click="handleFileClick">
        <font-awesome-icon :icon="faFileImport" size="2xl" />
        <span>Add files</span>
      </button>
    </section>
    <section class="flex flex-col gap-2 p-2  border-4 border-primary-500 flex-1">
      <h2 class="text-xl font-bold">Category</h2>
      <input v-model=input class="p-2 border-primary-600 bg-white border-2 text-black" />
      <div
v-if="dummyCategoryList.length > 0"
        class="flex flex-col gap-2 p-2  border-primary-600 bg-white border-2 text-white max-h-48 overflow-y-scroll">
        <button
v-for="category in dummyCategoryList" :key="category"
          class="p-2 border-2 bg-primary-500  hover:bg-primary-600 cursor-pointer">
          {{ category }}
        </button>
      </div>

      <template v-if="input.length > 0">
        <span v-if="isInCollection">Category <code class="border-2 border-gray-500 p-1 rounded-md">{{ input.trim()
        }}</code>
          will be
          <b>reused</b></span>
        <span v-else> Category <code class="border-2 border-gray-500 p-1 rounded-md">{{ input.trim() }}</code> will be
          <b>created</b></span>
      </template>
      <button type="button" class="p-2 border-2 bg-primary-500 hover:bg-primary-600 cursor-pointer text-white">
        Submit
      </button>
    </section>
  </div>
</template>
