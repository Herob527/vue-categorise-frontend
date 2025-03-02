<script setup lang="ts">
import { useTemplateRef } from 'vue';

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInput');

const handleFileClick = () => {
  fileInputRef.value?.click();
};
</script>

<template>
  <div class="bg-white text-black p-2">
    <section>
      <h3 class="text-xl font-bold">Initial category</h3>
      <input type="text" />
    </section>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      multiple />
    <button
      class="hover:cursor-pointer"
      @click="handleFileClick">
      Add files
    </button>
  </div>
</template>
