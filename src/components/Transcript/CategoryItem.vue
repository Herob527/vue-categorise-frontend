<script setup lang="ts">
import { type CategoryModel } from '@/types/generated';
import { useQuery } from '@tanstack/vue-query';
import { getAll } from '@/actions/categories';
defineProps<{
  categoryData: CategoryModel;
  className?: string;
}>();

const { data } = useQuery({
  queryKey: ['category', 'get'],
  queryFn: () => getAll(),
});
</script>
<template>
  <select :class="className">
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
