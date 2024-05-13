<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { faker } from '@faker-js/faker';
import { useFinaliseStore } from '@/stores/finaliseStore';
import { FilterFactory } from '@/utils/FilterFactory';
import { ProcessingPipeline } from '@/utils/ProcessingPipeline';

const store = useFinaliseStore();

// Define the type for the data structure
interface ExampleDataItem {
  fileName: string;
  text: string;
  categoryIndex: number;
  category: string;
  duration: number;
}

const categories = ref<string[]>([]);
const extensions = ['wav', 'mp3'] as const;

const TRANSCRIPT_ENTRIES = 15;

const exampleData = ref<ExampleDataItem[]>([]);

const filteredData = computed(() => {
  const filter = new FilterFactory(exampleData.value);
  const filteredEntries = filter
    .addFilter((item) => item.text.trim() !== '', store.omit_empty)
    .filter();
  const processing = new ProcessingPipeline(filteredEntries);
  const processedData = processing
    .addStage(
      (value) => ({
        ...value,
        category: value.category.toLowerCase(),
      }),
      store.category_to_lower,
    )
    .addStage(
      (value) => ({
        ...value,
        category: value.category.replace(/\s+/, store.category_space_replacer),
      }),
      !!store.category_space_replacer,
    )
    .process();

  return processedData;
});

onMounted(() => {
  categories.value = faker.lorem
    .words(5)
    .split(' ')
    .map((entry) => {
      const randomIndex = Math.floor(Math.random() * TRANSCRIPT_ENTRIES);
      const splitVal = entry.split('');
      if (randomIndex > TRANSCRIPT_ENTRIES / 2) {
        return faker.lorem.words(2);
      }
      if (randomIndex < TRANSCRIPT_ENTRIES / 2) {
        return [splitVal[0].toUpperCase(), ...splitVal.slice(1)].join('');
      } else {
        return splitVal.join('');
      }
    });

  exampleData.value = Array.from({ length: TRANSCRIPT_ENTRIES }, () => {
    const categoryIndex = Math.floor(Math.random() * categories.value.length);
    const category = categories.value[categoryIndex];
    const fileName = faker.system.fileName({ extensionCount: 0 });
    const extension = faker.helpers.arrayElement(extensions);
    const text = faker.lorem.sentences({ min: 0, max: 2 });
    return {
      fileName: `${fileName}.${extension}`,
      text: text.length > 10 ? `${text.substring(0, 10)}...` : text,
      categoryIndex,
      category,
      duration: faker.number.float({ max: 10, min: 0, fractionDigits: 2 }),
    };
  });
});

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
        v-for="[index, example] in Object.entries(filteredData)"
        :key="example.fileName"
        class="flex entry-container"
      >
        <span
          :style="`--length: ${TRANSCRIPT_ENTRIES.toString().length}`"
          class="py-2 text-left text-white index bg-primary-400"
          >{{ Number(index) + 1 }}</span
        >
        <span class="flex flex-1 gap-4 p-2 line">
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
