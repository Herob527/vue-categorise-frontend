<script setup lang="ts">
import { useCategories } from '@/hooks/useCategories';

const { useGetAll } = useCategories();
const { data, isSuccess } = useGetAll();
</script>

<template>
  <select v-if="isSuccess">
    <option v-for="category in data" :key="category.name">
      {{ category.name }}
    </option>
  </select>
</template>
