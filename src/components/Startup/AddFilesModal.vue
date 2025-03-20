<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';

import { faFileImport, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/vue-query';
import { getAll } from '@/actions/categories';

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInput');

const handleFileClick = () => {
  fileInputRef.value?.click();
};

const categoryInput = ref('');

const { data, isLoading } = useQuery({
  queryKey: ['category', 'get'],
  queryFn: () => getAll(),
});

const isInCollection = computed(() => {
  if (categoryInput.value === '') return false;
  return data.value?.some(
    (text) =>
      text.name.toLowerCase() === categoryInput.value.trim().toLowerCase(),
  );
});
const files = ref<File[]>([]);

type ReturnData = {
  files: File[];
  category: string;
};

defineEmits<{
  (e: 'submit', data: ReturnData): void;
}>();
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
    <section class="flex flex-col gap-2 p-2 border-3 border-primary-500 flex-1">
      <h2 class="text-xl font-bold">Category</h2>
      <div class="bg-white flex flex-row flex-nowrap">
        <input
          v-model="categoryInput"
          maxlength="50"
          class="p-2 text-black w-full border-2 border-primary-600 border-r-0 outline-none" />
        <button
          type="button"
          class="bg-red-500 text-white px-4 relative hover:cursor-pointer hover:bg-red-700 border-red-600 border-2 border-l-0"
          @click="categoryInput = ''">
          <font-awesome-icon
            :icon="faXmark"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
        </button>
      </div>
      <div
        class="flex flex-col gap-2 p-2 border-primary-600 bg-white border-2 max-h-48 overflow-y-scroll">
        <template v-if="data && data.length > 0">
          <button
            v-for="category in data"
            :key="category.name"
            class="p-2 border-2 bg-primary-500 hover:bg-primary-600 cursor-pointer text-white"
            @click="categoryInput = category.name">
            {{ category.name }}
          </button>
        </template>
        <p v-else-if="isLoading">Loading...</p>
        <p
          v-else
          class="text-gray-500">
          No categories found
        </p>
      </div>

      <template v-if="categoryInput.length > 0">
        <span v-if="isInCollection"
          >Category
          <code class="border-2 border-gray-500 p-1 rounded-md">{{
            categoryInput.trim()
          }}</code>
          will be
          <b>reused</b></span
        >
        <span v-else>
          Category
          <code class="border-2 border-gray-500 p-1 rounded-md">{{
            categoryInput.trim()
          }}</code>
          will be <b>created</b></span
        >
      </template>
      <span v-else> Files will be <b>uncategorized</b> </span>
    </section>

    <button
      type="button"
      :disabled="files.length === 0"
      class="p-2 border-2 bg-primary-500 hover:bg-primary-600 cursor-pointer text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
      @click="$emit('submit', { files, category: categoryInput })">
      <span v-if="files.length === 0"> Add </span>
      <span v-else> Add ({{ files.length }} files)</span>
    </button>
  </div>
</template>
