<script setup lang="ts">
import { deleteOne, getAll } from '@/actions/categories';
import { useQueryClient, useMutation, useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const client = useQueryClient();

const { mutate } = useMutation({
  mutationFn: (name: string) => deleteOne({ name }),
  onSuccess: () => {
    client.refetchQueries({ queryKey: ['category', 'get'] });
    client.invalidateQueries({ queryKey: ['category', 'get'] });
    client.invalidateQueries({ queryKey: ['get-paginated-transcript'] });
    client.invalidateQueries({ queryKey: ['bindingsCount'] });
  },
});

const { data, isLoading } = useQuery({
  queryKey: ['category', 'get'],
  queryFn: () => getAll(),
});

const selected = ref('');
const handleClick = () => {
  if (selected.value === '') return;
  mutate(selected.value);
};

const handleChange = (event: Event) => {
  selected.value = (event.target as HTMLSelectElement).value;
};
</script>
<template>
  <section
    class="flex flex-col gap-2 justify-between p-2 border-2 border-primary-800">
    <h2 class="text-xl font-bold">Remove category</h2>
    <div class="flex flex-col gap-2">
      <select
        class="p-2 text-black bg-white"
        @change="handleChange">
        <option
          v-if="!isLoading && data && data.length > 0"
          value="">
          Select category
        </option>
        <option
          v-if="!isLoading && data && data.length == 0"
          value="">
          No categories to delete
        </option>
        <option
          v-for="entry in data"
          :key="entry.name"
          :value="entry.name">
          {{ entry.name }}
        </option>
      </select>
      <button
        type="button"
        class="p-2 border-2 bg-primary-500 border-primary-600 hover:bg-primary-600 cursor-pointer"
        @click="handleClick">
        Delete
      </button>
    </div>
  </section>
</template>
