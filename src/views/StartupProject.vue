<script setup lang="ts">
import { getPaginated } from '@/actions/bindings';
import AudioList from '@/components/Startup/AudioList.vue';
import TableActionPanel from '@/components/Startup/TableActionPanel.vue';
import { ENTRIES_PER_PAGE } from '@/constants';
import { statuses } from '@/types/shared';
import { useQuery } from '@tanstack/vue-query';
import { reactive } from 'vue';

type PaginationMetadata = {
  page: number;
  data: {
    id: string;
    fileName: string;
  }[];
};

const initialPagination = Object.fromEntries(
  Object.values(statuses).map((entry) => [
    entry,
    { page: 0, data: [] as PaginationMetadata[] },
  ]),
);

const paginationData = reactive(initialPagination);

const {
  data: transcriptData,
  refetch,
  isLoading,
  isRefetching: isTranscriptRefetching,
} = useQuery({
  queryKey: ['get-paginated-transcript', paginationData.inDatabase.page],
  queryFn: () =>
    getPaginated({
      page: paginationData.inDatabase.page,
      pageSize: ENTRIES_PER_PAGE,
    }),
  placeholderData: { bindings: [], page: paginationData.inDatabase.page },
});
</script>
<template>
  <main>
    <TableActionPanel @upload="(files) => {}" />
    <AudioList
      @page-change="
        (status, page) => {
          paginationData[status].page = page;
        }
      "
    />
  </main>
</template>
