<script lang="ts" setup>
import { deleteOne, getAll, updateOne } from '@/actions/categories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import ModifyCategoryItem from './ModifyCategoryItem.vue';
import { useDebounceFn } from '@vueuse/core';

const client = useQueryClient();

const { data, isLoading, refetch } = useQuery({
  queryKey: ['category', 'get'],
  queryFn: () => getAll(),
});

const { mutate, isIdle } = useMutation({
  mutationKey: ['category', 'delete'],
  mutationFn: async (name: string) => deleteOne({ name }),
  onSuccess: () => {
    refetch();
  },
});

const { mutate: updateName } = useMutation({
  mutationKey: ['category', 'update'],
  mutationFn: ({ id, newName }: { id: string; newName: string }) =>
    updateOne({ id, newName }),
  onSuccess: () => {
    client.refetchQueries({ queryKey: ['category', 'get'] });
  },
});

const sendDebouncedUpdate = useDebounceFn((id: string, newName: string) => {
  const category = data.value?.filter((c) => c.name === newName);
  if (category && category?.length) return;
  updateName({ id, newName });
}, 200);
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
        :key="category.id"
        :initial-value="category.name"
        :disabled="!isIdle"
        @delete="
          () => {
            mutate(category.name);
          }
        "
        @update="sendDebouncedUpdate" />
    </div>
    <p v-else-if="isLoading">Loading...</p>
    <p v-else>No categories to modify</p>
  </section>
</template>
