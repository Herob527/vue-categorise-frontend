<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
defineProps<{ title?: string }>();
defineEmits(['close']);
</script>
<template>
  <div
    class="fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50"
    @click="$emit('close')"
  ></div>
  <div
    class="flex overflow-auto fixed top-1/2 left-1/2 z-10 flex-col p-2 pt-0 max-h-screen text-white -translate-x-1/2 -translate-y-1/2 bg-primary-500"
  >
    <div
      class="flex sticky top-0 flex-row gap-2 items-center pb-2 mt-2 bg-primary-500"
    >
      <ActionButton
        :onClick="() => $emit('close')"
        class-name="bg-primary-500 border-2 border-primary-600 hover:bg-primary-600 relative p-4 text-white rounded-xl"
      >
        <font-awesome-icon
          :icon="faXmark"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </ActionButton>

      <h2 class="text-2xl font-bold">{{ title || '' }}</h2>
    </div>
    <slot />
  </div>
</template>
