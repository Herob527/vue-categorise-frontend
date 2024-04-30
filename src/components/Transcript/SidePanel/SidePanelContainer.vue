<script setup lang="ts">
import { ref } from 'vue';
import AddCategory from './AddCategory.vue';

const isHidden = ref(false);
</script>
<template>
  <div
    class="relative p-2 text-white bg-primary-500 data-[is-hidden='true']:w-0 data-[is-hidden='true']:opacity-0 data-[is-hidden='true']:translate-x-full"
    :data-is-hidden="isHidden"
  >
    <AddCategory />

    <button
      type="button"
      @click="isHidden = !isHidden"
      class="absolute top-1/2 p-3 bg-blue-400 -translate-y-1/2"
    >
      >
    </button>
  </div>
</template>
