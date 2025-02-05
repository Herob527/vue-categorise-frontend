<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { faFile, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

const inputFileRef = ref<HTMLInputElement | null>(null);

const deleteAll = () => {
  emit('delete');
};

const handleFileUpload = (event: Event) => {
  console.log('file-upload');
  const files = (event.target as HTMLInputElement)?.files;
  if (!files) return;
  emit('upload', files);
};

const handleSubmitAll = () => {
  emit('submit');
};

const emit = defineEmits<{
  (e: 'upload', files: FileList): void;
  (e: 'submit' | 'delete'): void;
}>();
</script>

<template>
  <div class="mb-4 rounded-lg border-2 border-primary-400 overflow-clip">
    <div class="p-2 text-white bg-primary-500">
      <p class="text-xl font-bold">Bulk actions</p>
    </div>
    <div class="flex flex-row gap-2 p-2 w-full">
      <ActionButton
        :on-click="() => inputFileRef?.click()"
        class-name="bg-blue-500 text-white px-4 py-4 relative rounded-md hover:bg-blue-700"
        label="Add item(s)">
        <input
          ref="inputFileRef"
          type="file"
          class="hidden"
          multiple
          @change="handleFileUpload" />
        <font-awesome-icon
          :icon="faFile"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
      </ActionButton>
      <ActionButton
        :on-click="handleSubmitAll"
        :class-name="`${'bg-blue-500 hover:bg-blue-700 cursor-pointer'} text-white px-4 py-4 relative rounded-md`"
        label="Submit all">
        <font-awesome-icon
          :icon="faPlus"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
      </ActionButton>
      <ActionButton
        :on-click="() => deleteAll()"
        class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700"
        label="Delete all">
        <font-awesome-icon
          :icon="faTrash"
          class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
      </ActionButton>
    </div>
  </div>
</template>
