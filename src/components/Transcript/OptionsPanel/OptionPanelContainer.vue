<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import AddCategory from './AddCategory.vue';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import RemoveCategory from './RemoveCategory.vue';

defineEmits(['close']);
</script>
<template>
  <div
    class="fixed top-0 left-0 z-10 w-full h-full backdrop-blur-sm backdrop-brightness-75"
    @click="$emit('close')"></div>
  <div
    class="container flex fixed top-1/2 left-1/2 z-10 flex-col gap-4 p-2 text-white -translate-x-1/2 -translate-y-1/2 bg-primary-500">
    <div>
      <ActionButton
        :on-click="() => $emit('close')"
        class-name="bg-primary-500 border-2 border-primary-600 relative p-4 text-white rounded-xl">
        <font-awesome-icon
          :icon="faXmark"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </ActionButton>
    </div>
    <div class="grid grid-cols-4 grid-flow-col gap-2">
      <div class="bg-primary-600"></div>
      <AddCategory />
      <RemoveCategory />
      <div class="bg-primary-600"></div>
    </div>
  </div>
</template>
