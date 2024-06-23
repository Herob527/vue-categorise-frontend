<script setup lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useBindingsStore } from '@/stores/bindingsStore';
import AudioItem from './AudioItem.vue';
import { statuses } from '@/types/shared';
import { computed, ref, watch } from 'vue';
import DataTable from '../DataTable.vue';
import { useQuery } from '@tanstack/vue-query';
import { getCount, getPaginated } from '@/actions/bindings';

const store = useBindingsStore();

const inDbPage = ref(0);

const QUERY_PAGE_SIZE = 20;

const {
  data: transcriptData,
  refetch,
  isLoading,
  isRefetching: isTranscriptRefetching,
} = useQuery({
  queryKey: ['get-paginated-transcript', inDbPage.value],
  queryFn: () =>
    getPaginated({ page: inDbPage.value, pageSize: QUERY_PAGE_SIZE }),
  placeholderData: [],
});

const { data: countData } = useQuery({
  queryKey: ['get-count'],
  queryFn: () => getCount(),
});

watch(
  () => transcriptData.value || isTranscriptRefetching.value,
  () => {
    console.log('test');

    if (transcriptData.value) {
      store.addDbFiles(
        transcriptData.value.map((entry) => ({
          id: entry.binding.id,
          duration: entry.audio.audio_length,
          filename: entry.audio.file_name,
        })),
      );
    }
  },
);
watch(
  () => inDbPage.value,
  async () => refetch(),
);
const pendingEntries = computed(() =>
  store.getFieldsByStatus(statuses.PENDING),
);

const processingEntried = computed(() =>
  store.getFieldsByStatus(statuses.PROCESSING),
);

const errorEntries = computed(() => store.getFieldsByStatus(statuses.ERROR));

const entriesInDB = computed(() => store.getFieldsByStatus(statuses.IN_DB));

const fields = ['File name', 'Duration', 'Actions'] as const;
</script>

<template>
  <div class="flex flex-col gap-2">
    <DataTable
      :data="pendingEntries"
      :class-name="
        pendingEntries.length > 0
          ? `rounded-xl border-2 border-primary-500`
          : ``
      "
      :item-keys="fields"
      title="Pending"
      :items-count="pendingEntries.length"
    >
      <template v-slot:fallback>
        <span class="p-4 bg-white">Add some data pal</span>
      </template>
      <template v-slot:item="{ index, entry }">
        <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem>
      </template>
    </DataTable>

    <DataTable
      :data="processingEntried"
      :class-name="
        processingEntried.length > 0
          ? `rounded-xl border-2 border-primary-500`
          : ``
      "
      :item-keys="fields"
      title="Processing"
      :items-count="processingEntried.length"
    >
      <template v-slot:fallback>
        <span class="p-4 bg-white">Submit some data pal</span>
      </template>
      <template v-slot:item="{ index, entry }">
        <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem>
      </template>
    </DataTable>

    <DataTable
      :data="entriesInDB"
      :class-name="
        entriesInDB.length > 0 ? `rounded-xl border-2 border-primary-500` : ``
      "
      :item-keys="fields"
      :items-count="countData"
      :is-loading="isLoading || isTranscriptRefetching"
      title="In DB"
      :page-size="QUERY_PAGE_SIZE"
      @submit:page="
        (newPage: number) => {
          inDbPage = newPage;
        }
      "
    >
      <template v-slot:fallback>
        <span class="p-4">Nothing in DB pal</span>
      </template>

      <template v-slot:item="{ index, entry }">
        <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem>
      </template>
      <template v-slot:loadingItem="{ index }">
        <span
          :class="`w-full ${index % 2 == 1 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'} h-[50px] animate-pulse`"
          >&nbsp;</span
        >
      </template>
    </DataTable>
    <DataTable
      :data="errorEntries"
      :class-name="`rounded-xl border-2 border-primary-500`"
      :item-keys="fields"
      :items-count="errorEntries.length"
      title="Errored"
      v-if="errorEntries.length > 0"
    >
      <template v-slot:fallback>
        <span class="p-4">Everything going just fine for now pal</span>
      </template>

      <template v-slot:item="{ index, entry }">
        <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem>
      </template>
    </DataTable>
  </div>
</template>
