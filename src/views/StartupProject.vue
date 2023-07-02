<script setup lang="ts">
import CategoryEntry from '@/components/Startup/CategoryEntry.vue';
import CreateCategory from '@/components/Startup/CreateCategory.vue';
import { useCategoriesStore } from '@/stores/categories';
const { useGetAllCategories } = useCategoriesStore();
const { data, isLoading, isSuccess } = useGetAllCategories();
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isSuccess" class="container mx-auto">
    <div class="flex flex-col gap-4">
      <div v-for="category in data" :key="category.name">
        <CategoryEntry :category="category" />
      </div>
    </div>
    <CreateCategory />
  </div>
</template>
