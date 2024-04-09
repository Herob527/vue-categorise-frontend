<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { useBindingsStore } from '@/stores/bindingsStore';
import { statuses } from '@/types/shared';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, ref } from 'vue';

const inputFileRef = ref<HTMLInputElement | null>(null);

const { getAvailableStatuses } = useBindingsStore();
const availableStatuses = getAvailableStatuses();

const nothingToSend =
  availableStatuses.size === 1 && availableStatuses.has(statuses.IN_DB);

const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement)?.files;
  if (!files) return;
  console.log(files);
};
onMounted(() => {
  console.log(availableStatuses, nothingToSend);
});
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
        :on-click="() => inputFileRef?.click()"
        class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
        label="Add item(s)"
      >
        <input
          type="file"
          class="hidden"
          ref="inputFileRef"
          multiple
          @change="handleFileUpload"
        />
        <FontAwesomeIcon
          icon="fa-solid fa-file"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
        />
      </ActionButton>
      <ActionButton
        :on-click="() => console.log('clicked')"
        :class-name="`${nothingToSend ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700 cursor-pointer'} text-white px-4 py-4 relative rounded-md`"
        :disabled="nothingToSend"
        label="Submit all"
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
