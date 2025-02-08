<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{ min: number; max: number }>();

defineEmits<{
  (e: 'submit', value: number): void;
}>();

const page = ref<string | null>(null);

const isValid = computed(() => {
  if (!page.value) return true;
  return (
    parseInt(page.value, 10) > props.min &&
    parseInt(page.value, 10) < props.max + 1
  );
});
</script>
<template>
  <div class="inline-flex relative flex-col gap-3">
    <input
      v-model="page"
      type="text"
      inputmode="numeric"
      class="w-10 h-10 text-center border-2 border-primary-500"
      placeholder="..." />
    <button
      type="button"
      class="flex justify-center items-center w-10 h-10 text-white border-2 bg-primary-600 border-primary-500 hover:bg-primary-500"
      @click="
        () => {
          if (!page) return;
          if (!isValid) return;
          const parsedPage = parseInt(page, 10);
          $emit('submit', parsedPage - 1);
          page = null;
        }
      ">
      Go
    </button>
    <span
      v-if="!isValid"
      class="absolute right-1/2 top-full text-center text-red-500 translate-x-1/2">
      Allowed range: {{ props.min + 1 }} - {{ props.max }}
    </span>
  </div>
</template>
