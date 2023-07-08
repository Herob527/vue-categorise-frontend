<script setup lang="ts">
import CategoryEntry from '@/components/Startup/CategoryEntry.vue';
import CreateCategory from '@/components/Startup/CreateCategory.vue';
import AddToDb from '@/components/Startup/AddToDb.vue';
import { useCategoriesStore } from '@/stores/categories';
import { useBindings } from '@/hooks/useBindings';
import { onUpdated } from 'vue';

const { useGetAllCategories } = useCategoriesStore();
const { data, isLoading, isSuccess } = useGetAllCategories();
const { useGetAllBindings } = useBindings();
const { data: bindings } = useGetAllBindings();
onUpdated(() => {
  console.log(bindings.value);
});
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isSuccess" class="container mx-auto">
    <div v-if="data.length > 0" class="flex flex-col gap-4">
      <div v-for="category in data" :key="category.name">
        <CategoryEntry :category="category" />
      </div>
    </div>
    <div v-else class="p-4 mx-auto bg-gray-200 rounded-xl text-slate-500">
      <span>No categories there</span>
    </div>
    <div class="flex flex-wrap gap-4 mt-4 md:flex-nowrap">
      <AddToDb />
      <CreateCategory />
    </div>
  </div>
</template>
