<script setup lang="ts">
import finalize from '@/actions/finalise';
import { useQuery } from '@tanstack/vue-query';
import DataTable from '@/components/DataTable.vue';

import ActionButton from '@/components/ActionButton.vue';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const { data } = useQuery({
  queryKey: ['finalize-get-all'],
  queryFn: () => finalize.getAll(),
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
const processDate = (date: string) => {
  console.log(Temporal.PlainDateTime.from(date));
  return Temporal.PlainDateTime.from(date).toString();
};

const fields = ['Id', 'Created at', 'Updated at', 'Status', 'Actions'];
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
          <span
            class="py-1 px-2 rounded-lg cursor-text"
            :title="entry.id">
            {{ entry.id }}
          </span>
        </div>

        <div class="flex-1">
          {{ processDate(entry.created_at) }}
        </div>

        <div class="flex-1">
          {{ processDate(entry.updated_at) }}
        </div>

        <div class="flex-1">
          {{ entry.status }}
        </div>
        <div class="flex-1">
          <ActionButton
            :on-click="() => handleClick(entry.id)"
            class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700 "
            label="Delete">
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
