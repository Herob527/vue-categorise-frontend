<script setup lang="ts">
import { getPaginated } from '@/actions/bindings';
import ActionButton from '@/components/ActionButton.vue';
import DataTable from '@/components/DataTable.vue';
import TableActionPanel from '@/components/Startup/TableActionPanel.vue';
import { ENTRIES_PER_PAGE } from '@/constants';
import { useBindingsStore } from '@/stores/bindingsStore';
import { statuses, type Entry } from '@/types/shared';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';

const initialPagination = Object.fromEntries(
  Object.values(statuses).map((entry) => [entry, 0]),
);

export type dataType = { id: string; fileName: string };

const paginationData = reactive(initialPagination);

const { data: transcriptData } = useQuery({
  queryKey: ['get-paginated-transcript', paginationData.inDatabase],
  queryFn: () =>
    getPaginated({
      page: paginationData.inDatabase,
      pageSize: ENTRIES_PER_PAGE,
    }),
  placeholderData: { bindings: [], page: paginationData.inDatabase },
});

const { addFiles } = useBindingsStore();
const { getAll, getAvailableStatuses } = storeToRefs(useBindingsStore());

const transformtedData = computed(
  () =>
    transcriptData.value?.bindings.map(
      (entry) =>
        ({
          id: entry.binding.id,
          file: new File([], entry.audio.file_name),
          status: statuses.IN_DB,
          duration: entry.audio.audio_length,
          filename: entry.audio.file_name,
        }) satisfies Entry,
    ) ?? [],
);

type modes = 'DB' | 'LOCAL';

const showMode = ref<modes>('DB');

const shownData = computed(() => {
  if (showMode.value === 'DB') {
    return transformtedData.value;
  } else {
    return getAll.value ?? [];
  }
});

const fields = ['File name', 'Status', 'Actions'] as const;
</script>
<template>
  <main>
    <TableActionPanel
      @upload="
        (files) => {
          addFiles(files);
        }
      "
      @delete="
        () => {
          // data = data.set(statuses.PENDING, []);
        }
      " />

    <DataTable
      :data="shownData ?? []"
      :class-name="`rounded-xl border-2 border-primary-500 overflow-clip`"
      :item-keys="fields"
      :page-size="ENTRIES_PER_PAGE"
      @submit:page="
        (newPage: number) => {
          console.log(newPage);
        }
      ">
      <template #top-heading>
        <div class="flex flex-row bg-primary-600 p-2 justify-between">
          <p class="text-2xl font-bold text-white uppercase">Summary</p>
          <div
            class="text-white flex flex-row gap-3 items-center justify-center">
            <button
              type="button"
              :class="[
                'cursor-pointer px-4 py-[4px]  rounded-2xl transition-colors',
                showMode === 'DB' ? 'bg-primary-500' : 'bg-primary-600',
              ]"
              :onClick="() => (showMode = 'DB')">
              Remote
            </button>
            <button
              type="button"
              :class="[
                'cursor-pointer px-4 py-[4px] rounded-2xl transition-colors',
                showMode === 'LOCAL' ? 'bg-primary-500' : 'bg-primary-600',
              ]"
              :onClick="() => (showMode = 'LOCAL')">
              Local
            </button>
          </div>
        </div>
      </template>
      <template #fallback>
        <span class="p-4">Nothing there yet</span>
      </template>

      <template #item="{ index, entry }">
        <div
          :class="`w-full text-center ${index % 2 == 0 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'} flex flex-row justify-center items-center`">
          <div class="flex-1">
            <span
              class="py-1 px-2 rounded-lg cursor-text"
              :title="entry.filename">
              {{
                entry.filename.length > 15
                  ? entry.filename.slice(0, 15) + '...'
                  : entry.filename
              }}
            </span>
          </div>

          <div class="flex-1">
            <span class="flex flex-col justify-center items-center py-2 px-4">{{
              $t(entry.status)
            }}</span>
          </div>

          <div class="flex-1">
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
