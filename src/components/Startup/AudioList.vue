<script setup lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useBindingsStore } from '@/stores/bindingsStore';
import AudioItem from './AudioItem.vue';
import { onMounted } from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';

const store = useBindingsStore();

onMounted(() => {
  store.synchronise();
});
</script>

<template>
  <div
    class="container mx-auto rounded-lg border-2 border-gray-400 overflow-clip"
  >
    <DynamicScroller :items="store.entries" :min-item-size="75">
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem :item="item" :data-index="index" :active="active">
          <AudioItem :key="item.id" :index="index" :entry="item"></AudioItem>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>
