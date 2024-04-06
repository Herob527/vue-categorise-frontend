<script setup lang="ts">
import { useBindingsStore } from '@/stores/bindingsStore';
import { onMounted } from 'vue';

const store = useBindingsStore();

onMounted(() => {
  store.synchronise();
});
</script>

<template>
  <ol v-for="item in store.entries" v-bind:key="item.id">
    <li>
      <span>{{ item.filename }}</span>
      <span>{{ item.duration }}</span>
      <span> {{ item.status }} </span>
    </li>
  </ol>
</template>
