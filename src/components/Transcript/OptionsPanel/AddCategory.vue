<script setup lang="ts">
import { post } from '@/actions/categories';
import type { CategoryModel } from '@/types/generated';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const categoryName = ref('');

const client = useQueryClient();

const { mutate, error, reset } = useMutation<
  undefined,
  Error,
  { name: CategoryModel['name'] }
>({
  mutationKey: ['category', 'post'],
  mutationFn: (value) => post(value),
});

const handleSubmit = async () => {
  mutate(
    {
      name: categoryName.value,
    },
    {
      onSuccess: () => {
        client.refetchQueries({ queryKey: ['category', 'get'] });
      },
    },
  );
  categoryName.value = '';
};
</script>
<template>
  <section class="flex flex-col">
    <h2 class="text-xl font-bold">Add category</h2>
    <label for="new_category_name">Name</label>
    <div class="flex flex-row mt-2">
      <input
        id="new_category_name"
        v-model="categoryName"
        type="text"
        name="name"
        class="bg-white text-black px-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-500"
        @input="() => reset()" />

      <button
        class="relative bg-green-500 text-white p-4 hover:cursor-pointer hover:bg-green-700 disabled:bg-gray-500 disabled:text-gray-400 disabled:cursor-not-allowed"
        type="button"
        :disabled="categoryName.trim().length === 0"
        @click="handleSubmit">
        <font-awesome-icon
          :icon="faPlus"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </button>
    </div>
    <span
      v-if="error"
      class="text-white"
      >Error: {{ error.message }}</span
    >
  </section>
</template>
