<script setup lang="ts">
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

defineProps<{ title: string; icon: IconDefinition }>();
</script>

<template>
  <div class="bg-primary-500 text-white max-w-96 max-h-48 drop-shadow-2xl">
    <header
      class="text-xl font-bold border-b-2 border-gray-100 p-4 py-2 flex flex-row justify-between gap-2 items-center">
      <h2>
        {{ title }}
      </h2>
      <font-awesome-icon :icon="icon" />
    </header>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>
