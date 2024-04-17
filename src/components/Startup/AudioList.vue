<script setup lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useBindingsStore } from '@/stores/bindingsStore';
import AudioItem from './AudioItem.vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import { statuses } from '@/types/shared';
import { computed, onMounted } from 'vue';

const store = useBindingsStore();

onMounted(() => {
  store.synchronise();
});

const pendingEntries = computed(() =>
  store.getFieldsByStatus(statuses.PENDING),
);
const entriesInDB = computed(() => store.getFieldsByStatus(statuses.IN_DB));
</script>

<template>
  <div
    class="container mx-auto rounded-lg border-2 border-gray-400 overflow-clip"
  >
    <div v-if="pendingEntries.length === 0" class="p-4">
      <p>Enter something pal</p>
    </div>
    <DynamicScroller :items="pendingEntries" :min-item-size="75" vue-else>
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem :item="item" :data-index="index" :active="active">
          <AudioItem :key="item.id" :index="index" :entry="item"></AudioItem>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
  <div
    class="container mx-auto mt-4 rounded-lg border-2 border-gray-400 overflow-clip"
  >
    <div v-if="entriesInDB.length === 0" class="p-4">
      <p>Nothing in DB pal</p>
    </div>
    <DynamicScroller :items="entriesInDB" :min-item-size="75" v-else>
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem :item="item" :data-index="index" :active="active">
          <AudioItem :key="item.id" :index="index" :entry="item"></AudioItem>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>
