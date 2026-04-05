<script setup lang="ts">
import finalize from '@/actions/finalise';
import { useQuery } from '@tanstack/vue-query';
import DataTable from '@/components/DataTable.vue';

import ActionButton from '@/components/ActionButton.vue';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { ExportStatus } from '@/types/generated';

const { data } = useQuery({
  queryKey: ['finalize-get-all'],
  queryFn: () => finalize.getAll(),
  refetchIntervalInBackground: true,
  refetchInterval: 1000,
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

<template v-if="data && Array.isArray(data)">
  <DataTable
    :data="data ?? []"
    :item-keys="fields"
    :class-name="`rounded-xl border-2 border-primary-500 overflow-clip w-full`"
    :page-size="1200"
    :items-count="data?.length"
    :page="0"
    :pagination-key="''">
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
        <div class="flex-1">
          <ActionButton
            :on-click="() => handleClick(entry.id)"
            :disabled="entry.status !== ExportStatus.NUMBER_2"
            class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700 "
            label="Download">
            <font-awesome-icon
              :icon="faDownload"
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
