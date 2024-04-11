<script setup lang="ts">
import { useBindingsStore } from '@/stores/bindingsStore';
import AudioItem from './AudioItem.vue';
import { onMounted } from 'vue';

const store = useBindingsStore();

onMounted(() => {
  store.synchronise();
});
</script>

<template>
  <div
    class="container mx-auto rounded-lg border-2 border-gray-400 overflow-clip"
  >
    <AudioItem
      v-for="[index, item] in store.entries.entries()"
      v-bind:key="item.id"
      :index="index"
      :entry="item"
    ></AudioItem>
  </div>
</template>
