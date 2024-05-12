<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { faker } from '@faker-js/faker';
import { useFinaliseStore } from '@/stores/finaliseStore';
import { FilterFactory } from '@/utils/FilterFactory';

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
const extensions = ['wav', 'mp3'];

const exampleData = ref<ExampleDataItem[]>([]);
const filteredData = computed(() => {
  const filter = new FilterFactory(exampleData.value);
  filter.addFilter((item) => item.text.trim() !== '', store.omit_empty);
  return filter.filter();
});

onMounted(() => {
  console.log('do-stuff');
  categories.value = faker.lorem
    .words(5)
    .split(' ')
    .map((entry) => {
      const randomIndex = Math.floor(Math.random() * 10);
      const splitVal = entry.split('');
      if (randomIndex > 7) {
        return faker.lorem.words(2);
      }
      if (randomIndex < 5) {
        return [splitVal[0].toUpperCase(), ...splitVal.slice(1)].join('');
      } else {
        return splitVal.join('');
      }
    });

  exampleData.value = Array.from({ length: 10 }, () => {
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
    .replace(/\{|\}/g, '')
    .replace('file', fileName)
    .replace('duration', duration.toString())
    .replace('category_index', categoryIndex.toString())
    .replace('category', category)
    .replace('text', text);
  return formattedText;
});
</script>
<template>
  <section class="flex flex-col">
    <h2>Transcript preview</h2>
    <div class="flex flex-col">
      <span v-for="example in filteredData" :key="example.fileName">
        {{ processLine(example) }}
      </span>
    </div>
  </section>
</template>
