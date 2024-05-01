<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getPaginated } from '@/actions/bindings';
import TranscriptItem from './TranscriptItem.vue';
import SidePanelContainer from './SidePanel/SidePanelContainer.vue';
import { ENTRIES_PER_PAGE } from '@/constants';

const { data } = useQuery({
  queryKey: ['get-paginated-transcript'],
  meta: {
    page: 0,
    pageSize: ENTRIES_PER_PAGE,
  },
  queryFn: async ({ meta }) => {
    const { page, pageSize } = (meta as { page: number; pageSize: number }) || {
      page: 0,
      pageSize: ENTRIES_PER_PAGE,
    };
    return getPaginated({ page, pageSize });
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
