<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { faFile, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export type Buttons = 'UPLOAD' | 'SUBMIT' | 'DELETE';

defineProps<{
  disabledButtons: Buttons[];
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
        class-name="bg-blue-500 text-white px-4 py-2 relative rounded-md hover:bg-blue-700 "
        :disabled="disabledButtons.includes('UPLOAD')"
        label="Add item(s)">
        <div class="text-white">
          <font-awesome-icon :icon="faFile" />

          <span> Add items </span>
        </div>
      </ActionButton>
      <ActionButton
        :on-click="handleSubmitAll"
        :class-name="`${'bg-blue-500 hover:bg-blue-700 cursor-pointer'} text-white px-4 py-2 relative rounded-md disabled:bg-gray-400`"
        label="Submit all"
        :disabled="disabledButtons.includes('SUBMIT')">
        <div class="text-white">
          <font-awesome-icon :icon="faPlus" />

          <span> Submit items </span>
        </div>
      </ActionButton>
      <ActionButton
        :on-click="() => deleteAll()"
        class-name="bg-red-500 text-white px-4 py-2 relative rounded-md hover:bg-red-700 disabled:bg-gray-400"
        label="Delete all"
        :disabled="disabledButtons.includes('DELETE')">
        <div class="text-white">
          <font-awesome-icon :icon="faTrash" />

          <span> Delete items </span>
        </div>
      </ActionButton>
    </div>
  </div>
</template>
