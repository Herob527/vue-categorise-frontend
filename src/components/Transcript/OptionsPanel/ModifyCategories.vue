<script lang="ts" setup>
import { getAll } from '@/actions/categories';
import { useQuery } from '@tanstack/vue-query';
import ModifyCategoryItem from './ModifyCategoryItem.vue';


const { data, isLoading } = useQuery({
  queryKey: ['category', 'get'],
  queryFn: () => getAll(),
});

</script>
<template>
  <section>
    <h2>Modify categories</h2>
    <template v-if="!isLoading && data && data.length > 0">
      <ModifyCategoryItem v-for="category in data" :key="category.name" :initial-value="category.name" />
    </template>
    <p v-else-if="isLoading">Loading...</p>
    <p v-else>No categories to modify</p>
  </section>
</template>
