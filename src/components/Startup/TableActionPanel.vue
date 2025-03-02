<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { faFile, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

type buttons = 'UPLOAD' | 'SUBMIT' | 'DELETE';

defineProps<{
  disabledButtons: buttons[];
}>();

const deleteAll = () => {
  emit('delete');
};

const handleSubmitAll = () => {
  emit('submit');
};

const emit = defineEmits<{
  (e: 'submit' | 'delete' | 'uploadClick'): void;
}>();
</script>

<template>
  <div class="mb-4 rounded-lg border-2 border-primary-400 overflow-clip">
    <div class="p-2 text-white bg-primary-500">
      <p class="text-xl font-bold">Bulk actions</p>
    </div>
    <div class="flex flex-row gap-2 p-2 w-full">
      <ActionButton
        :on-click="() => $emit('uploadClick')"
        class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700 "
        :disabled="disabledButtons.includes('UPLOAD')"
        label="Add item(s)">
        <font-awesome-icon
          :icon="faFile"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
      </ActionButton>
      <ActionButton
        :on-click="handleSubmitAll"
        :class-name="`${'bg-blue-500 hover:bg-blue-700 cursor-pointer'} text-white px-4 py-4 relative rounded-md disabled:bg-gray-400`"
        label="Submit all"
        :disabled="disabledButtons.includes('SUBMIT')">
        <font-awesome-icon
          :icon="faPlus"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
      </ActionButton>
      <ActionButton
        :on-click="() => deleteAll()"
        class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700 disabled:bg-gray-400"
        label="Delete all"
        :disabled="disabledButtons.includes('DELETE')">
        <font-awesome-icon
          :icon="faTrash"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
      </ActionButton>
    </div>
  </div>
</template>
