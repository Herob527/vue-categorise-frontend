<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
defineProps<{ title?: string }>();
defineEmits(['close']);
</script>
<template>
  <div
    class="fixed top-0 left-0 z-10 w-full h-full backdrop-blur-sm backdrop-brightness-75"
    @click="$emit('close')"></div>
  <div
    class="flex overflow-auto fixed top-1/2 left-1/2 z-10 flex-col p-2 pt-0 text-white -translate-x-1/2 -translate-y-1/2 max-h-[95vh] bg-primary-500">
    <div
      class="flex sticky top-0 flex-row gap-2 justify-between items-center py-2 w-full bg-primary-500">
      <h2 class="text-2xl font-bold">{{ title || '' }}</h2>
      <ActionButton
        :on-click="() => $emit('close')"
        class-name="border-2 border-primary-600 hover:bg-primary-700 bg-primary-600 relative p-4 text-white">
        <font-awesome-icon
          :icon="faXmark"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </ActionButton>
    </div>
    <slot />
  </div>
</template>
