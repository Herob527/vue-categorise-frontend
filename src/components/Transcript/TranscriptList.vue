<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getPaginated } from '@/actions/bindings';
import TranscriptItem from './TranscriptItem.vue';
import SidePanelContainer from './SidePanel/SidePanelContainer.vue';
import { ENTRIES_PER_PAGE, LOCALSTORAGE_PAGE_KEY } from '@/constants';

const currentPageFromStorage = parseInt(
  localStorage.getItem(LOCALSTORAGE_PAGE_KEY) || '0',
  10,
);
const { data } = useQuery({
  queryKey: ['get-paginated-transcript'],
  meta: {
    page: currentPageFromStorage,
    pageSize: ENTRIES_PER_PAGE,
  },
  queryFn: async ({ meta }) => {
    const { page, pageSize } = meta as { page: number; pageSize: number };
    const value = await getPaginated({ page, pageSize });
    if (value.length === 0) {
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
        v-for="entry in data"
        :key="entry.binding.id"
        :entry="entry"
      />
    </div>
    <SidePanelContainer />
  </div>
</template>
