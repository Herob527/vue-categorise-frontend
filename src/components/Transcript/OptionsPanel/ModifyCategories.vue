<script lang="ts" setup>
import { deleteOne, getAll } from '@/actions/categories';
import { useMutation, useQuery } from '@tanstack/vue-query';
import ModifyCategoryItem from './ModifyCategoryItem.vue';

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
</script>
<template>
  <section>
    <h2 class="text-xl font-bold mb-2">Modify categories</h2>

    <div
      v-if="!isLoading && data && data.length > 0"
      class="flex flex-row flex-wrap gap-2 justify-start">
      <ModifyCategoryItem
        v-for="category in data"
        :key="category.name"
        :initial-value="category.name"
        :disabled="isPending || isSuccess"
        @delete="
          () => {
            mutate(category.name);
          }
        " />
    </div>
    <p v-else-if="isLoading">Loading...</p>
    <p v-else>No categories to modify</p>
  </section>
</template>
