<script setup lang="ts">
import { getPaginated } from '@/actions/bindings';
import AudioList from '@/components/Startup/AudioList.vue';
import TableActionPanel from '@/components/Startup/TableActionPanel.vue';
import { ENTRIES_PER_PAGE } from '@/constants';
import { statuses } from '@/types/shared';
import { useQuery } from '@tanstack/vue-query';
import { v4 } from 'uuid';
import { reactive, ref, watch } from 'vue';

const initialPagination = Object.fromEntries(
  Object.values(statuses).map((entry) => [entry, 0]),
);

export type dataType = { id: string; fileName: string };

const initialData = new Map(
  Object.values(statuses).map((entry) => [entry, [] as dataType[]]),
);

const paginationData = reactive(initialPagination);

const data = ref(initialData);

const {
  data: transcriptData,
  refetch,
  isLoading,
  isRefetching: isTranscriptRefetching,
} = useQuery({
  queryKey: ['get-paginated-transcript', paginationData.inDatabase],
  queryFn: () =>
    getPaginated({
      page: paginationData.inDatabase,
      pageSize: ENTRIES_PER_PAGE,
    }),
  placeholderData: { bindings: [], page: paginationData.inDatabase },
});

watch(isLoading, () => {
  if (isLoading) return;

  const currentInDb = data.value.get(statuses.IN_DB) ?? [];
  const differentValues =
    transcriptData.value?.bindings?.filter((entry) =>
      currentInDb.every((i) => i.id !== entry.binding.id),
    ) ?? [];
  const newInDb = [
    ...currentInDb,
    ...differentValues.map((entry) => ({
      id: entry.binding.id,
      fileName: entry.audio.file_name,
    })),
  ];
  data.value = data.value.set(statuses.IN_DB, newInDb);
});
</script>
<template>
  <main>
    <TableActionPanel
      @upload="
        (files) => {
          const currentPending = data.get(statuses.PENDING) ?? [];

          const differentValues =
            [...files]?.filter((entry) =>
              currentPending.every((i) => i.fileName !== entry.name),
            ) ?? [];

          const newPending = [
            ...currentPending,
            ...differentValues.map((entry) => ({
              id: v4(),
              fileName: entry.name,
            })),
          ];
          data = data.set(statuses.PENDING, newPending);
        }
      "
      @delete="
        () => {
          data = data.set(statuses.PENDING, []);
        }
      "
    />
    <AudioList
      :data="data"
      @page-change="
        (status, page) => {
          paginationData[status] = page;
        }
      "
    />
  </main>
</template>
