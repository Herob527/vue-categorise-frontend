<script setup lang="ts">
import finalize from '@/actions/finalise';
import { useMutation, useQuery } from '@tanstack/vue-query';
import DataTable from '@/components/DataTable.vue';

import ActionButton from '@/components/ActionButton.vue';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ExportStatus } from '@/types/generated';
import { ref } from 'vue';

const page = ref(0);
const pageSize = 2;

const { data, refetch } = useQuery({
  queryKey: ['finalize-get-all', page, pageSize],
  queryFn: () => {
    console.log(page);
    return finalize.getAll({ page: page.value, pageSize });
  },
  // TODO: Switch to SSE when backend ready
  refetchIntervalInBackground: true,
  refetchInterval: 100000,
});

const { mutate, isPending } = useMutation({
  mutationKey: ['finalize-remove-one'],
  mutationFn: (exportId: string) => finalize.deleteOne({ exportId }),
  onSuccess: () => {
    page.value = 0;
    refetch();
  },
});

const handleClick = async (exportId: string) => {
  const data = await finalize.download({ exportId });
  const url = URL.createObjectURL(data);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${exportId}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};
const processDate = (date: string) =>
  new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Warsaw',
  }).format(new Date(date));

const fields = ['Created at', 'Updated at', 'Status', 'Actions'];

const statusText = (status: ExportStatus) =>
  ({
    [ExportStatus.NUMBER_0]: 'Pending',
    [ExportStatus.NUMBER_1]: 'Processing',
    [ExportStatus.NUMBER_2]: 'Done',
    [ExportStatus.NUMBER_3]: 'Error',
  })[status];
</script>

<template v-if="data?.items && Array.isArray(data?.items)">
  <DataTable
    :data="data?.items ?? []"
    :item-keys="fields"
    :class-name="`rounded-xl border-2 border-primary-500 overflow-clip w-full`"
    :page-size="pageSize"
    :items-count="data?.pagination.total"
    :page="page"
    :pagination-key="'folder'"
    @submit:page="
      (newPage) => {
        page = newPage;
      }
    ">
    <template #top-heading>
      <div class="flex flex-row bg-primary-600 p-2 justify-between">
        <p class="text-2xl font-bold text-white uppercase">Processes</p>
      </div>
    </template>
    <template #fallback>
      <span class="p-4">Nothing there yet</span>
    </template>

    <template #item="{ index, entry }">
      <div
        :class="[
          'w-full text-center',
          index % 2 == 0
            ? 'bg-gray-200 hover:bg-gray-300'
            : 'hover:bg-gray-100',
          'flex flex-row justify-center items-center py-2',
        ]">
        <div class="flex-1">
          {{ processDate(entry.created_at) }}
        </div>

        <div class="flex-1">
          {{ processDate(entry.updated_at) }}
        </div>

        <div class="flex-1">
          {{ statusText(entry.status) }}
        </div>
        <div class="flex-1 space-x-1">
          <ActionButton
            :on-click="() => handleClick(entry.id)"
            :disabled="entry.status !== ExportStatus.NUMBER_2"
            class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700 "
            label="Download">
            <font-awesome-icon
              :icon="faDownload"
              class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
          </ActionButton>
          <ActionButton
            :on-click="() => mutate(entry.id)"
            :disabled="isPending || entry.status !== ExportStatus.NUMBER_2"
            class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700 "
            label="Remove">
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
</template>
