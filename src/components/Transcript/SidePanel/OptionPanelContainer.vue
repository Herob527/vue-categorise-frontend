<script setup lang="ts">
import AddCategory from './AddCategory.vue';
</script>
<template>
  <div
    class="fixed top-1/2 left-1/2 z-10 p-2 text-white -translate-x-1/2 -translate-y-1/2 bg-primary-500"
  >
    <button
      @click="() => $emit('close')"
      type="button"
      class="p-2 bg-primary-400"
    >
      Close
    </button>
    <AddCategory />
  </div>
</template>
