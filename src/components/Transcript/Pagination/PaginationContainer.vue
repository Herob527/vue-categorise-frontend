<script setup lang="ts">
import { getCount } from '@/actions/bindings';
import { ENTRIES_PER_PAGE, LOCALSTORAGE_PAGE_KEY } from '@/constants';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import PaginationEntry from './PaginationEntry.vue';
import { computed, ref } from 'vue';

import { getPaginated } from '@/actions/bindings';

const { data, isLoading } = useQuery({
  queryKey: ['get-count'],
  queryFn: () => getCount(),
});

const queryClient = useQueryClient();

const currentPageFromStorage = parseInt(
  localStorage.getItem(LOCALSTORAGE_PAGE_KEY) || '0',
  10,
);

const splitToPages = (amountOfEntries: number) => {
  const pages = Math.ceil(amountOfEntries / ENTRIES_PER_PAGE);
  const pagesArray = Array.from({ length: pages }, (_, i) => i);
  return pagesArray;
};

const paginationData = computed(() =>
  data.value !== undefined ? splitToPages(data.value) : [],
);

const isPageInRange =
  currentPageFromStorage <= paginationData.value.length - 1 || isLoading.value;

const currentPage = ref(isPageInRange ? currentPageFromStorage : 0);

document.title = `Transcript - ${currentPage.value + 1}`;

const saveCurrentPage = (newPage: number) => {
  currentPage.value = newPage;
  document.title = `Transcript - ${currentPage.value + 1}`;
  localStorage.setItem(LOCALSTORAGE_PAGE_KEY, `${newPage}`);
};

const handleNewPage = (newPage: number) => {
  queryClient.fetchQuery({
    queryKey: ['get-paginated-transcript'],
    meta: {
      page: newPage,
      pageSize: ENTRIES_PER_PAGE,
    },
    queryFn: async ({ meta }) => {
      const { page, pageSize } = (meta as {
        page: number;
        pageSize: number;
      }) || {
        page: newPage,
        pageSize: ENTRIES_PER_PAGE,
      };
      return getPaginated({ page, pageSize });
    },
  });
};
const getProperSlice = (paginationData: number[]) => {
  console.log(currentPage.value + 1);
  // TODO: Refactor this to reduce else ifs
  if (currentPage.value === 0) {
    return paginationData.slice(currentPage.value + 3, currentPage.value + 6);
  } else if (currentPage.value === 1) {
    return paginationData.slice(currentPage.value + 2, currentPage.value + 5);
  } else if (currentPage.value === 2) {
    return paginationData.slice(currentPage.value + 1, currentPage.value + 4);
  } else if (currentPage.value === 3) {
    return paginationData.slice(currentPage.value, currentPage.value + 3);
  } else if (currentPage.value === 4) {
    return paginationData.slice(currentPage.value - 1, currentPage.value + 2);
  } else if (currentPage.value === 5) {
    return paginationData.slice(currentPage.value - 1, currentPage.value + 2);
  } else if (currentPage.value === paginationData.length - 4) {
    return paginationData.slice(currentPage.value - 2, currentPage.value + 1);
  } else if (currentPage.value === paginationData.length - 3) {
    return paginationData.slice(currentPage.value - 3, currentPage.value);
  } else if (currentPage.value === paginationData.length - 2) {
    return paginationData.slice(currentPage.value - 4, currentPage.value - 1);
  } else if (currentPage.value === paginationData.length - 1) {
    return paginationData.slice(currentPage.value - 5, currentPage.value - 2);
  } else if (currentPage.value === paginationData.length) {
    return paginationData.slice(currentPage.value - 4, currentPage.value);
  } else if (currentPage.value >= 6) {
    return paginationData.slice(currentPage.value - 1, currentPage.value + 2);
  }
  return [];
};
</script>
<template>
  <footer class="flex gap-2 justify-center items-center">
    <PaginationEntry
      v-for="page in paginationData.slice(0, 3)"
      :class-name="currentPage === page ? 'bg-primary-500' : 'bg-primary-600'"
      :key="page"
      :page="page"
      @click="
        (newPage: number) => {
          saveCurrentPage(newPage);
          handleNewPage(newPage);
        }
      "
    />
    <span> Rest </span>
    <PaginationEntry
      v-for="page in getProperSlice(paginationData)"
      :class-name="currentPage === page ? 'bg-primary-500' : 'bg-primary-600'"
      :key="page"
      :page="page"
      @click="
        (newPage: number) => {
          saveCurrentPage(newPage);
          handleNewPage(newPage);
        }
      "
    />
    <span> Rest </span>
    <PaginationEntry
      v-for="page in paginationData.slice(-3)"
      :class-name="currentPage === page ? 'bg-primary-500' : 'bg-primary-600'"
      :key="page"
      :page="page"
      @click="
        (newPage: number) => {
          saveCurrentPage(newPage);
          handleNewPage(newPage);
        }
      "
    />
  </footer>
</template>
