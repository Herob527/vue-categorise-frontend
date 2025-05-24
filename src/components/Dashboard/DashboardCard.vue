<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="bg-primary-500 text-white max-w-64 max-h-48 drop-shadow-2xl">
    <h2 class="text-2xl font-bold border-b-2 border-gray-100 p-4 py-2">
      {{ title }}
    </h2>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>
