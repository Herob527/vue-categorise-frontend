<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StatusIcon from '../StatusIcon.vue';
import { type Entry, statuses } from '@/types/shared';

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
    <div v-if="index === 0" class="bg-gray-100">
      <div class="flex justify-between text-xl font-bold">
        <div class="flex-1 py-2 px-4">Title</div>
        <div class="flex-1 py-2 px-4">Duration (s)</div>
        <div class="flex-1 py-2 px-4">Status</div>
        <div class="flex-1 py-2 px-4">Actions</div>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex flex-col flex-1 justify-center items-center py-2 px-4">
        <span
          class="py-1 px-2 bg-gray-200 rounded-lg border-gray-400 cursor-text hover:bg-gray-300 border-[1px]"
          :title="filename"
        >
          {{ filename.length > 15 ? filename.slice(0, 15) + '...' : filename }}
        </span>
      </div>
      <div class="flex-1 py-2 px-4">{{ duration ?? '-' }}</div>
      <div class="relative flex-1 py-2 px-4">
        <StatusIcon :status="status" />
      </div>
      <div
        class="flex flex-row flex-1 gap-2 justify-center items-center py-2 px-4"
      >
        <ActionButton
          v-if="status === statuses.IN_DB || status === statuses.PENDING"
          :on-click="() => store.delete(id)"
          class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700"
          label="Delete"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-trash"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
          />
        </ActionButton>

        <ActionButton
          v-if="status === statuses.PENDING"
          :on-click="() => console.log('clicked')"
          class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
          label="Add"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
          />
        </ActionButton>

        <ActionButton
          v-if="status === 'error'"
          :on-click="() => console.log('clicked')"
          class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
          label="Retry"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-rotate-right"
            class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2"
          />
        </ActionButton>
      </div>
    </div>
  </div>
</template>
