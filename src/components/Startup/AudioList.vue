<script setup lang="ts">
import { useBindingsStore } from '@/stores/bindingsStore';
import { onMounted } from 'vue';
import ActionButton from '@/components/ActionButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StatusIcon from '../StatusIcon.vue';

const store = useBindingsStore();

onMounted(() => {
  store.synchronise();
});
</script>

<template>
  <table
    v-for="[index, item] in store.entries.entries()"
    v-bind:key="item.id"
    class="container mx-auto w-full text-center border-collapse border-spacing-2"
  >
    <tr v-if="index === 0" class="bg-gray-100">
      <th class="py-2 px-4">Title</th>
      <th class="py-2 px-4">Duration (s)</th>
      <th class="py-2 px-4">Status</th>
      <th class="py-2 px-4">Actions</th>
    </tr>
    <tr>
      <td class="py-2 px-4">{{ item.filename }}</td>
      <td class="py-2 px-4">{{ item.duration }}</td>
      <td class="relative py-2 px-4"><StatusIcon status="inDatabase" /></td>
      <td class="flex flex-row gap-2 justify-center items-center py-2 px-4">
        <ActionButton
          :on-click="() => console.log('clicked')"
          class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700"
          label="Delete"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-trash"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
          />
        </ActionButton>

        <ActionButton
          :on-click="() => console.log('clicked')"
          class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
          label="Added"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
          />
        </ActionButton>
      </td>
    </tr>
  </table>
</template>
