<script setup lang="ts">
import { computed } from 'vue';
import { useFinaliseStore } from '@/stores/finaliseStore';
import { useFinalisePreviewStore } from '@/stores/previewStore';

const store = useFinaliseStore();
const previewStore = useFinalisePreviewStore();

// Define the type for the data structure
interface ExampleDataItem {
  fileName: string;
  text: string;
  categoryIndex: number;
  category: string;
  duration: number;
}

const TRANSCRIPT_ENTRIES = 15;

const processLine = computed(() => (param: ExampleDataItem) => {
  const { fileName, text, categoryIndex, category, duration } = param;
  const formattedText = store.line_format
    .replace(/{file}/g, fileName)
    .replace(/{duration}/g, duration.toString())
    .replace(/{category_index}/g, categoryIndex.toString())
    .replace(/{category}/g, category)
    .replace(/{text}/g, text);
  return formattedText;
});
</script>
<template>
  <section
    class="flex overflow-scroll flex-col justify-between rounded-xl border-2 max-h-[500px] border-primary-500"
  >
    <h2 class="px-2 my-2 text-2xl font-bold">Transcript preview</h2>
    <div class="flex flex-col">
      <div
        v-for="[index, example] in Object.entries(previewStore.filteredData)"
        :key="example.fileName"
        class="flex entry-container"
      >
        <span
          :style="`--length: ${TRANSCRIPT_ENTRIES.toString().length}`"
          class="py-2 text-left text-white index bg-primary-400"
          >{{ Number(index) + 1 }}</span
        >
        <span class="flex flex-1 gap-4 p-2 line" :title="processLine(example)">
          {{ processLine(example).substring(0, 50)
          }}{{ processLine(example).length > 50 ? '...' : '' }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.index {
  display: inline-block;
  padding-left: 0.5rem;
  padding-right: 0.25rem;
  width: calc(20px * var(--length)); /* Adjust the width as needed */
}
.entry-container:nth-child(odd) .index {
  background-color: rgb(33 140 220);
}
.line {
  background-color: rgb(209 213 219);
}

.entry-container:nth-child(odd) .line {
  background-color: rgb(156 163 175);
}
</style>
