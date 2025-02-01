<script setup lang="ts">
import { getPaginated } from '@/actions/bindings';
import ActionButton from '@/components/ActionButton.vue';
import DataTable from '@/components/DataTable.vue';
import TableActionPanel from '@/components/Startup/TableActionPanel.vue';
import { ENTRIES_PER_PAGE } from '@/constants';
import { statuses } from '@/types/shared';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/vue-query';
import { v4 } from 'uuid';
import { reactive, ref } from 'vue';

const initialPagination = Object.fromEntries(
  Object.values(statuses).map((entry) => [entry, 0]),
);

export type dataType = { id: string; fileName: string };

const initialData = new Map(
  Object.values(statuses).map((entry) => [entry, [] as dataType[]]),
);

const paginationData = reactive(initialPagination);

const data = ref(initialData);

const { data: transcriptData } = useQuery({
  queryKey: ['get-paginated-transcript', paginationData.inDatabase],
  queryFn: () =>
    getPaginated({
      page: paginationData.inDatabase,
      pageSize: ENTRIES_PER_PAGE,
    }),
  placeholderData: { bindings: [], page: paginationData.inDatabase },
});

const fields = ['File name', 'Duration', 'Actions'] as const;
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
      " />

    <DataTable
      :data="transcriptData?.bindings ?? []"
      :class-name="`rounded-xl border-2 border-primary-500`"
      :item-keys="fields"
      title="In DB"
      :page-size="ENTRIES_PER_PAGE"
      @submit:page="
        (newPage: number) => {
          console.log(newPage);
        }
      ">
      <template #fallback>
        <span class="p-4">Nothing in DB pal</span>
      </template>

      <template #item="{ index, entry }">
        <div
          :class="`w-full text-center ${index % 2 == 0 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'} flex flex-row justify-between items-center`">
          <span
            class="py-1 px-2 bg-gray-200 rounded-lg border-gray-400 cursor-text hover:bg-gray-300 border-[1px]"
            :title="entry.audio.file_name">
            {{
              entry.audio.file_name.length > 15
                ? entry.audio.file_name.slice(0, 15) + '...'
                : entry.audio.file_name
            }}
          </span>

          <span
            class="flex flex-col flex-1 justify-center items-center py-2 px-4"
            >{{ entry.audio.audio_length ?? '-' }}</span
          >
          <ActionButton
            :on-click="
              () => {
                console.log('remove');
              }
            "
            class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700 "
            label="Delete">
            <font-awesome-icon
              :icon="faTrash"
              class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
          </ActionButton>
        </div>
      </template>
      <template #loadingItem="{ index }">
        <span
          :class="`w-full ${index % 2 == 1 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'} h-[50px] animate-pulse`">
          &nbsp;
        </span>
      </template>
    </DataTable>
  </main>
</template>
