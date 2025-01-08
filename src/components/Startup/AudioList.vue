<script setup lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useBindingsStore } from '@/stores/bindingsStore';
import AudioItem from './AudioItem.vue';
import { statuses } from '@/types/shared';
import { computed, onMounted, ref, watch } from 'vue';
import DataTable from '../DataTable.vue';
import { useQuery } from '@tanstack/vue-query';
import { getCount, getPaginated } from '@/actions/bindings';
import { ENTRIES_PER_PAGE } from '@/constants';
import type { dataType } from '@/views/StartupProject.vue';

const props = defineProps<{ data: Map<statuses, dataType[]> }>();

const pendingEntries = computed(() => props.data.get(statuses.PENDING) ?? []);
const processingEntries = props.data.get(statuses.PROCESSING) ?? [];
const transcriptData = props.data.get(statuses.IN_DB) ?? null;
const errorEntries = props.data.get(statuses.ERROR) ?? [];

const fields = ['File name', 'Duration', 'Actions'] as const;

defineEmits<{
  (e: 'pageChange', status: statuses, newPage: number): void;
}>();

onMounted(() => {
  console.log(pendingEntries.value);
});
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
      <template #fallback>
        <span class="p-4 bg-white">Add some data pal</span>
      </template>
      <template #item="{ index, entry }">
        <p>{{ entry.fileName }}</p>
      </template>
    </DataTable>

    <DataTable
      :data="processingEntries"
      :class-name="
        processingEntries.length > 0
          ? `rounded-xl border-2 border-primary-500`
          : ``
      "
      :item-keys="fields"
      title="Processing"
      :items-count="processingEntries.length"
    >
      <template #fallback>
        <span class="p-4 bg-white">Submit some data pal</span>
      </template>
      <!-- <template #item="{ index, entry }"> -->
      <!--   <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem> -->
      <!-- </template> -->
    </DataTable>

    <DataTable
      :data="transcriptData ?? []"
      :class-name="
        (transcriptData?.length ?? -1) > 0
          ? `rounded-xl border-2 border-primary-500`
          : ``
      "
      :item-keys="fields"
      title="In DB"
      :page-size="ENTRIES_PER_PAGE"
      @submit:page="
        (newPage: number) => {
          $emit('pageChange', statuses.IN_DB, newPage);
        }
      "
    >
      <template #fallback>
        <span class="p-4">Nothing in DB pal</span>
      </template>

      <!-- <template #item="{ index, entry }"> -->
      <!--   <AudioItem -->
      <!--     :key="entry.audio.id" -->
      <!--     :index="index" -->
      <!--     :entry="{ -->
      <!--       duration: entry.audio.audio_length, -->
      <!--       page: inDbPage, -->
      <!--       id: entry.audio.id, -->
      <!--       filename: entry.audio.file_name, -->
      <!--       status: statuses.IN_DB, -->
      <!--     }" -->
      <!--   ></AudioItem> -->
      <!-- </template> -->
      <template #loadingItem="{ index }">
        <span
          :class="`w-full ${index % 2 == 1 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'} h-[50px] animate-pulse`"
          >&nbsp;</span
        >
      </template>
    </DataTable>
    <DataTable
      v-if="errorEntries.length > 0"
      :data="errorEntries"
      :class-name="`rounded-xl border-2 border-primary-500`"
      :item-keys="fields"
      :items-count="errorEntries.length"
      title="Errored"
    >
      <template #fallback>
        <span class="p-4">Everything going just fine for now pal</span>
      </template>

      <!-- <template #item="{ index, entry }"> -->
      <!--   <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem> -->
      <!-- </template> -->
    </DataTable>
  </div>
</template>
