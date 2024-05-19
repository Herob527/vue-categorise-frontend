<script setup lang="ts">
import { useFinalisePreviewStore } from '@/stores/previewStore';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { computed, ref } from 'vue';

const props = defineProps<{ category: string }>();

const { fakeData } = useFinalisePreviewStore();

const dataWithCategory = computed(() =>
  fakeData.filter((d) => d.category === props.category),
);
const isOpen = ref(true);
</script>
<template>
  <div class="flex flex-col">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex gap-2 items-center"
    >
      <font-awesome-icon :icon="isOpen ? faFolderOpen : faFolder" />
      <span>{{ category }}</span>
    </button>
    <div v-if="isOpen">
      <div v-for="data in dataWithCategory" :key="data.fileName">
        <p>{{ data.fileName }}</p>
      </div>
    </div>
  </div>
</template>
