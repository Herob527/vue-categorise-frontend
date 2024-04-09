<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div
    class="container mx-auto mb-4 rounded-lg border-2 border-gray-400 overflow-clip"
  >
    <div class="px-2 bg-gray-100">
      <p class="text-xl font-bold">Bulk actions</p>
    </div>
    <div class="flex flex-row gap-2 p-2 w-full">
      <ActionButton
        :on-click="() => console.log('clicked')"
        class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
        label="Add all"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-plus"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
        />
      </ActionButton>
      <ActionButton
        :on-click="() => console.log('clicked')"
        class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700"
        label="Delete all"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-trash"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
        />
      </ActionButton>

      <ActionButton
        :on-click="() => console.log('clicked')"
        class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
        label="Summary"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-chart-simple"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
        />
      </ActionButton>
    </div>
  </div>
</template>
