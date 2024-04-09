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
    @click="props.onClick()"
    type="button"
    :title="label"
    :class="className"
    :disabled="disabled || false"
  >
    <slot></slot>
    <!-- This is where the child content will be inserted -->
  </button>
</template>
