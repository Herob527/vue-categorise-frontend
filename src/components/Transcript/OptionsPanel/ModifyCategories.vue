<script lang="ts" setup>
import { deleteOne, getAll, updateOne } from '@/actions/categories';
import { useMutation, useQuery } from '@tanstack/vue-query';
import ModifyCategoryItem from './ModifyCategoryItem.vue';
import { useDebounceFn } from '@vueuse/core';

const { data, isLoading, refetch } = useQuery({
  queryKey: ['category', 'get'],
  queryFn: () => getAll(),
});

const { mutate, isPending, isSuccess } = useMutation({
  mutationFn: async (name: string) => deleteOne({ name }),
  onSuccess: () => {
    refetch();
  },
});

const { mutate: updateName } = useMutation({
  mutationFn: async ({ id, newName }: { id: string; newName: string }) =>
    updateOne({ id, newName }),
});

const debouncedFn = useDebounceFn((id: string, newName: string) => {
  updateName({ id, newName });
}, 1000);
</script>
<template>
  <section>
    <h2 class="text-xl font-bold mb-2">Modify categories</h2>

    <div
      v-if="!isLoading && data && data.length > 0"
      class="flex flex-row flex-wrap gap-2 justify-start">
      <ModifyCategoryItem
        v-for="category in data"
        :id="category.id"
        :key="category.name"
        :initial-value="category.name"
        :disabled="isPending || isSuccess"
        @delete="
          () => {
            mutate(category.name);
          }
        "
        @update="debouncedFn" />
    </div>
    <p v-else-if="isLoading">Loading...</p>
    <p v-else>No categories to modify</p>
  </section>
</template>
