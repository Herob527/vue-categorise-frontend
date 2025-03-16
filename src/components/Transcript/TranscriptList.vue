<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getPaginated } from '@/actions/bindings';
import TranscriptItem from './TranscriptItem.vue';
import { ENTRIES_PER_PAGE, LOCALSTORAGE_PAGE_KEY } from '@/constants';

const getPageFromStorage = () =>
  parseInt(localStorage.getItem(LOCALSTORAGE_PAGE_KEY) || '0', 10);

const { data } = useQuery({
  queryKey: ['get-paginated-transcript'],
  meta: {
    page: getPageFromStorage,
    pageSize: ENTRIES_PER_PAGE,
  },
  queryFn: async ({ meta }) => {
    const { page, pageSize } = meta as { page: () => number; pageSize: number };
    const value = await getPaginated({ page: page(), pageSize });
    if (value.bindings.length === 0) {
      localStorage.setItem(LOCALSTORAGE_PAGE_KEY, '0');
      return getPaginated({ page: 0, pageSize });
    }
    return value;
  },
});
</script>
<template>
  <div class="flex flex-row gap-4">
    <div class="flex flex-col flex-1 gap-2">
      <TranscriptItem
        v-for="entry in data?.bindings"
        :key="entry.binding.id"
        :entry="entry" />
    </div>
  </div>
</template>
