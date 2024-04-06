<script setup lang="ts">
import { useBindingsStore } from '@/stores/bindingsStore';
import { onMounted } from 'vue';

const store = useBindingsStore();

onMounted(() => {
  store.synchronise();
});
</script>

<template>
  <table
    v-for="[index, item] in store.entries.entries()"
    v-bind:key="item.id"
    class="text-center border-collapse border-spacing-2"
  >
    <tr v-if="index === 0" class="bg-gray-100">
      <td class="py-2 px-4">Title</td>
      <td class="py-2 px-4">Duration</td>
      <td class="py-2 px-4">Status</td>
    </tr>
    <tr>
      <td class="py-2 px-4">{{ item.filename }}</td>
      <td class="py-2 px-4">{{ item.duration }}</td>
      <td class="py-2 px-4">{{ item.status }}</td>
    </tr>
  </table>
</template>
