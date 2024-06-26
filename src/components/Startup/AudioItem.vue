<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { type Entry, statuses } from '@/types/shared';

import {
  faRotateRight,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useBindingsStore } from '@/stores/bindingsStore';

const props = defineProps<{ entry: Entry; index: number }>();
const {
  entry: { status, filename, duration, id },
  index,
} = props;

const store = useBindingsStore();
</script>

<template>
  <div
    :class="`w-full text-center ${index % 2 == 0 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'}`"
  >
    <div class="flex justify-between">
      <div class="flex flex-col flex-1 justify-center items-center py-2 px-4">
        <span
          class="py-1 px-2 bg-gray-200 rounded-lg border-gray-400 cursor-text hover:bg-gray-300 border-[1px]"
          :title="filename"
        >
          {{ filename.length > 15 ? filename.slice(0, 15) + '...' : filename }}
        </span>
      </div>
      <span
        class="flex flex-col flex-1 justify-center items-center py-2 px-4"
        >{{ duration ?? '-' }}</span
      >
      <div
        class="flex flex-row flex-1 gap-2 justify-center items-center py-2 px-4"
      >
        <ActionButton
          v-if="status === statuses.IN_DB || status === statuses.PENDING"
          :on-click="() => store.delete(id)"
          class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700"
          label="Delete"
        >
          <font-awesome-icon
            :icon="faTrash"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
          />
        </ActionButton>

        <ActionButton
          v-if="status === statuses.PENDING"
          :on-click="() => store.submit(id)"
          class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
          label="Add"
        >
          <font-awesome-icon
            :icon="faPlus"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
          />
        </ActionButton>

        <ActionButton
          v-if="status === statuses.ERROR"
          :on-click="() => store.submit(id)"
          class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
          label="Retry"
        >
          <font-awesome-icon
            :icon="faRotateRight"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
          />
        </ActionButton>
      </div>
    </div>
  </div>
</template>
