<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';

const { useGetAllCategories } = useCategoriesStore();
const { data, isSuccess } = useGetAllCategories();
</script>

<template>
  <select v-if="isSuccess">
    <option v-for="category in data" :key="category.name">
      {{ category.name }}
    </option>
  </select>
</template>
