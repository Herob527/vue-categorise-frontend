<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';
import { ref } from 'vue';
const category = ref('');
const errorRef = ref('');
const { useAddCategory } = useCategoriesStore();

const { mutate } = useAddCategory();

const handleClick = async (e: Event) => {
  const { value } = category;
  if (!value) return;
  const res = mutate(value, {
    onError: (error) => {
      errorRef.value = error.response.data.detail;
    },
  });
};
</script>

<template>
  <div
    class="container inline-flex flex-col gap-4 justify-center items-center p-4 mx-auto mt-4 bg-gray-200 rounded-xl"
  >
    <div class="flex flex-col flex-wrap justify-center items-center">
      <label> Provide name for category: </label>
      <input
        type="text"
        v-model="category"
        class="p-2 rounded-xl"
        required
        @input="() => (errorRef = '')"
      />
    </div>
    <button
      @click="handleClick"
      type="button"
      class="p-2 rounded-xl border-2 bg-slate-300 border-slate-400"
      :class="errorRef.length > 0 ? 'border-red-400' : ''"
    >
      <span>Create category</span>
    </button>
    <span v-if="errorRef" class="text-red-400">{{ errorRef }} </span>
  </div>
</template>
