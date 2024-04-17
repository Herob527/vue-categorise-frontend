<script setup lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useBindingsStore } from '@/stores/bindingsStore';
import AudioItem from './AudioItem.vue';
import { statuses } from '@/types/shared';
import { computed, onMounted } from 'vue';
import DataTable from '../DataTable.vue';

const store = useBindingsStore();

onMounted(() => {
  store.synchronise();
});

const pendingEntries = computed(() =>
  store.getFieldsByStatus(statuses.PENDING),
);

const processingEntried = computed(() =>
  store.getFieldsByStatus(statuses.PROCESSING),
);

const entriesInDB = computed(() => store.getFieldsByStatus(statuses.IN_DB));
</script>

<template>
  <div class="container flex flex-col gap-2 mx-auto">
    <DataTable
      :data="pendingEntries"
      :class-name="
        pendingEntries.length > 0 ? `rounded-xl border-2 border-gray-400` : ``
      "
    >
      <template v-slot:fallback>
        <span class="p-4 rounded-xl border-2 border-gray-400"
          >Add some data pal</span
        >
      </template>
      <template v-slot:item="{ index, entry }">
        <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem>
      </template>
      <template v-slot:heading>
        <p>Pending</p>
      </template>
    </DataTable>

    <DataTable
      :data="processingEntried"
      :class-name="
        processingEntried.length > 0
          ? `rounded-xl border-2 border-gray-400`
          : ``
      "
    >
      <template v-slot:fallback>
        <span class="p-4 rounded-xl border-2 border-gray-400"
          >Submit some data pal</span
        >
      </template>
      <template v-slot:item="{ index, entry }">
        <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem>
      </template>
      <template v-slot:heading>
        <p>Pending</p>
      </template>
    </DataTable>

    <DataTable
      :data="entriesInDB"
      :class-name="
        entriesInDB.length > 0 ? `rounded-xl border-2 border-gray-400` : ``
      "
    >
      <template v-slot:fallback>
        <span class="p-4 rounded-xl border-2 border-gray-400"
          >Nothing in DB pal</span
        >
      </template>
      <template v-slot:item="{ index, entry }">
        <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem>
      </template>
      <template v-slot:heading>
        <p>In database</p>
      </template>
    </DataTable>
  </div>
</template>
