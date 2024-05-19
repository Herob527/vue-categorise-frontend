import { acceptHMRUpdate, defineStore } from 'pinia';
import { useFinaliseStore } from './finaliseStore';
import { computed } from 'vue';
import { FilterFactory } from '@/utils/FilterFactory';
import { ProcessingPipeline } from '@/utils/ProcessingPipeline';
import { faker } from '@faker-js/faker';

const TRANSCRIPT_ENTRIES = 15;

const EXTENSIONS = ['wav', 'mp3'] as const;

interface FakeData {
  fileName: string;
  text: string;
  categoryIndex: number;
  category: string;
  duration: number;
}

export const useFinalisePreviewStore = defineStore('preview-finalise', () => {
  const store = useFinaliseStore();
  let cached: FakeData[];

  const fakeData = computed(() => {
    const categories = [...fakeCategories.value, store.uncategorized_name];

    const uncategorizedFiles = Array.from({ length: 2 }, () => {
      const fileName = faker.system.fileName({ extensionCount: 0 });
      const extension = faker.helpers.arrayElement(EXTENSIONS);
      const text = faker.lorem.sentences({ min: 0, max: 2 });
      return {
        fileName: `${fileName}.${extension}`,
        text: text.length > 10 ? `${text.substring(0, 10)}...` : text,
        categoryIndex: categories.length - 1,
        category: store.uncategorized_name,
        duration: 10,
      };
    });

    const data = cached ?? [
      ...Array.from({ length: TRANSCRIPT_ENTRIES }, () => {
        const categoryIndex = Math.floor(Math.random() * categories.length);
        const category = categories[categoryIndex];
        const fileName = faker.system.fileName({ extensionCount: 0 });
        const extension = faker.helpers.arrayElement(EXTENSIONS);
        const text = faker.lorem.sentences({ min: 0, max: 2 });
        return {
          fileName: `${fileName}.${extension}`,
          text: text.length > 10 ? `${text.substring(0, 10)}...` : text,
          categoryIndex,
          category,
          duration: faker.number.float({ max: 10, min: 0, fractionDigits: 2 }),
        };
      }),
      ...uncategorizedFiles,
    ];
    cached = data;
    return data.map((entry) => ({
      ...entry,
      category: categories[entry.categoryIndex],
    }));
  });

  const fakeCategories = computed(() => {
    return faker.lorem
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
  });

  const filteredData = computed(() => {
    const data = fakeData.value;
    const filter = new FilterFactory(data);
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
          category: value.category.replace(
            /\s+/,
            store.category_space_replacer,
          ),
        }),
        !!store.category_space_replacer,
      )
      .process();

    return processedData;
  });
  return { fakeData, fakeCategories, filteredData };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useFinalisePreviewStore, import.meta.hot),
  );
}
