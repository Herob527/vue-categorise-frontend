<script setup lang="ts">
import { getCount } from '@/actions/bindings';
import { ENTRIES_PER_PAGE } from '@/constants';
import { useQuery } from '@tanstack/vue-query';
import PaginationEntry from './PaginationEntry.vue';
import { computed, ref } from 'vue';

const { data } = useQuery({
  queryKey: ['get-count'],
  queryFn: () => getCount(),
});

const currentPage = ref(0);

const splitToPages = (amountOfEntries: number) => {
  const pages = Math.ceil(amountOfEntries / ENTRIES_PER_PAGE);
  const pagesArray = Array.from({ length: pages }, (_, i) => ({
    page: i,
    offset: i * ENTRIES_PER_PAGE,
  }));
  return pagesArray;
};

const paginationData = computed(() =>
  data.value !== undefined ? splitToPages(data.value) : [],
);
</script>
<template>
  <footer class="flex gap-2">
    <PaginationEntry
      v-for="{ page, offset } in paginationData"
      :class-name="currentPage === page ? 'bg-primary-500' : 'bg-primary-600'"
      :key="page"
      :page="page"
      :offset="offset"
      @click="
        (newPage: number | Event) => {
          if (typeof newPage !== 'number') return;
          currentPage = newPage;
        }
      "
    />
  </footer>
</template>