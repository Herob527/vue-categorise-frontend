<script setup lang="ts">
import { type CategoryModel } from '@/types/generated';
import { useQuery } from '@tanstack/vue-query';
import { getAll } from '@/actions/categories';

withDefaults(
  defineProps<{
    categoryData?: CategoryModel | null;
    className?: string;
  }>(),
  { categoryData: undefined, className: undefined },
);

defineEmits<{
  (e: 'change'): void;
}>();

const { data, isLoading } = useQuery({
  queryKey: ['category', 'get'],
  queryFn: () => getAll(),
});
</script>
<template>
  <select
    :class="className"
    :on-change="$emit('change')">
    <option
      v-if="data?.length === 0 && !isLoading"
      value="0">
      No category
    </option>
    <option
      v-if="data && data?.length > 0 && !isLoading"
      value="0">
      No category
    </option>
    <option
      v-for="entry in data"
      :key="entry.id"
      :value="entry.id"
      :selected="entry.id === categoryData?.id">
      {{ entry.name }}
    </option>
  </select>
</template>
