<script setup lang="ts">
const props = defineProps<{
  onClick: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    type="button"
    :title="label"
    :class="className"
    :disabled="disabled || false"
    @click="props.onClick()">
    <slot></slot>
    <!-- This is where the child content will be inserted -->
  </button>
</template>
