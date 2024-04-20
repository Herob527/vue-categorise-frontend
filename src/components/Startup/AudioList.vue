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

const fields = ['File name', 'Duration', 'Actions'];
</script>

<template>
  <div class="container flex flex-col gap-2 mx-auto">
    <DataTable
      :data="pendingEntries"
      :class-name="
        pendingEntries.length > 0
          ? `rounded-xl border-2 border-primary-500`
          : ``
      "
      :item-keys="fields"
      title="Pending"
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
      title="In DB"
    >
      <template v-slot:fallback>
        <span class="p-4">Nothing in DB pal</span>
      </template>

      <template v-slot:item="{ index, entry }">
        <AudioItem :key="entry.id" :index="index" :entry="entry"></AudioItem>
      </template>
    </DataTable>
  </div>
</template>
