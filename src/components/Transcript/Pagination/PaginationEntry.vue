<script setup lang="ts">
const props = defineProps<{
  page: number;
  className?: string;
}>();

defineEmits<{
  (e: 'click', page: number): void;
}>();
</script>
<template>
  <button
    type="button"
    :class="`relative p-5 text-white bg-primary-500 cursor-pointer ${className || ''}`"
    @click="
      () => {
        $emit('click', props.page);
      }
    ">
    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {{ page + 1 }}
    </span>
  </button>
</template>
