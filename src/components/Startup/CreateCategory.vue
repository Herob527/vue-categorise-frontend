<script setup lang="ts">
import { useCategories } from '@/hooks/useCategories';
import { ref } from 'vue';
import { v4 } from 'uuid';

const category = ref('');
const errorRef = ref('');
const { usePost: useAddCategory } = useCategories();

const { mutate } = useAddCategory();

const handleClick = async () => {
  const { value } = category;
  if (!value) return;
  mutate(
    {
      id: v4(),
      name: value,
    },
    {
      onError: (error) => {
        errorRef.value = error?.response?.data.detail;
      },
      onSettled: () => (category.value = ''),
    },
  );
};
</script>

<template>
  <div
    class="container inline-flex flex-col gap-4 justify-center items-center p-4 mx-auto bg-gray-200 rounded-xl"
  >
    <div class="flex flex-col flex-wrap justify-center items-center">
      <label> Provide name for category: </label>
      <input
        type="text"
        v-model="category"
        class="p-2 rounded-xl outline-none focus:border-blue-400 focus:outline-blue-400"
        required
        @input="() => (errorRef = '')"
      />
    </div>
    <button
      @click="handleClick"
      type="button"
      class="p-2 text-white bg-blue-500 rounded-xl border-2 transition-colors hover:bg-blue-600"
      :class="errorRef.length > 0 ? 'border-red-600' : ''"
    >
      <span>Create category</span>
    </button>
    <span v-if="errorRef" class="text-red-700">{{ errorRef }} </span>
  </div>
</template>
