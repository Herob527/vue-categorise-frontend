<script setup lang="ts">
import { type CategoryModel } from '@/types/generated';
import { useQuery } from '@tanstack/vue-query';
import { getAll } from '@/actions/categories';
const props = defineProps<{ categoryData: CategoryModel }>();

const { data } = useQuery({
  queryKey: ['category', 'get'],
  queryFn: () => getAll(),
});
</script>
<template>
  <select>
    <option
      v-for="entry in data"
      :key="entry.id"
      value="entry.id"
      :selected="entry.id === categoryData.id"
    >
      {{ entry.name }}
    </option>
  </select>
</template>
