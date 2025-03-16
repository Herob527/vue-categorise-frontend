<script setup lang="ts">
const { fileName } = defineProps<{ fileName: string }>();

const MAX_LENGTH = 30;

const nameToDisplay =
  fileName.length > MAX_LENGTH
    ? `${fileName.slice(0, MAX_LENGTH)}...`
    : fileName;
</script>
<template>
  <span
    class="col-span-1 self-center break-words"
    :title="fileName"
    >{{ nameToDisplay.replace(/\./g, '&#8203;.') }}</span
  >
</template>
