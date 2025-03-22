<script lang="ts" setup>
import { ref } from 'vue';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
  initialValue: string;
  disabled?: boolean;
}>();

const category = ref(props.initialValue);

defineEmits<{
  (e: 'update', oldValue: string, newValue: string): void;
  (e: 'delete'): void;
}>();
</script>
<template>
  <div class="flex flex-row">
    <input
      type="text"
      class="bg-white text-black px-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-500"
      :value="category"
      :disabled="disabled"
      @input="
        (event: Event) => {
          const oldValue = category;
          const inputValue = (event.target as HTMLInputElement).value;
          category = inputValue;
          $emit('update', oldValue, inputValue);
        }
      " />
    <button
      class="relative bg-red-500 text-white p-4 hover:cursor-pointer hover:bg-red-700 disabled:bg-gray-500 disabled:text-gray-400 disabled:cursor-not-allowed"
      type="button"
      :disabled="disabled"
      @click="$emit('delete')">
      <font-awesome-icon
        :icon="faXmark"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </button>
  </div>
</template>
