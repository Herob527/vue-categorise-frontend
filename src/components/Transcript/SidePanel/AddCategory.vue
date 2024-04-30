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
  <div class="flex flex-col">
    <label for="new_category_name">Name</label>
    <input
      type="text"
      id="new_category_name"
      name="name"
      v-model="categoryName"
    />
    <button :onclick="handleSubmit" type="button">Add category</button>
  </div>
</template>
