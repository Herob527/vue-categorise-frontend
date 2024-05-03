<script setup lang="ts">
import { post } from '@/actions/categories';
import type { CategoryModel } from '@/types/generated';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

const categoryName = ref('');

const client = useQueryClient();

const { mutate } = useMutation<
  undefined,
  Error,
  { name: CategoryModel['name'] }
>({
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
  <section class="flex flex-col gap-2 p-2 border-2 border-primary-800">
    <h2 class="text-xl font-bold">Add category</h2>
    <label for="new_category_name">Name</label>
    <input
      type="text"
      id="new_category_name"
      name="name"
      class="text-black"
      v-model="categoryName"
    />
    <button
      :onclick="handleSubmit"
      type="button"
      class="p-2 border-2 bg-primary-500 border-primary-600"
    >
      Submit
    </button>
  </section>
</template>
