<script setup lang="ts" generic="T">
import { computed, ref } from 'vue';

const props = defineProps<{
  data: T[];
  className?: string;
  title?: string;
  itemKeys?: string[] | readonly string[];
  itemsCount?: number;
  isLoading?: boolean;
}>();

defineEmits<{
  'submit:page': [value: number];
}>();

const selectedPage = ref<number | null>(0);
const pickedJumpPage = ref<number | null>(null);
const pageSize = 20;

const splitToPages = (amountOfEntries: number): (number | 'dot')[] => {
  const pages = Array.from(Array(amountOfEntries).keys());
  const firstPage = 0;
  const lastPage = amountOfEntries - 1;
  const usedPage = selectedPage.value || 0;
  const lowerBound = usedPage - 1 > 0 ? usedPage - 1 : 0;
  const upperBound = usedPage + 2;

  const inBetween = pages.slice(lowerBound, upperBound);
  console.table([
    ['lowerBound', lowerBound],
    ['upperBound', upperBound],
    ['usedPage', usedPage],
  ]);
  if (inBetween[0] === 0) {
    return [0, 'dot', 1, 2, 3, 'dot', lastPage];
  } else if (inBetween[inBetween.length - 1] === pages.length - 1) {
    return [firstPage, 'dot', ...inBetween];
  }
  console.log('inBetween', inBetween);

  return [firstPage, 'dot', ...inBetween, 'dot', lastPage] as const;
};

const pages = computed(() =>
  props.itemsCount ? splitToPages(props.itemsCount) : [],
);

const isValid = computed(() => {
  if (!pickedJumpPage.value) return true;
  return (
    pickedJumpPage.value > 0 &&
    pickedJumpPage.value < (props.itemsCount || 0) + 1
  );
});
</script>
<template>
  <div>
    <div class="flex flex-col">
      <!-- Heading -->
      <p class="p-2 text-2xl font-bold text-white uppercase bg-primary-600">
        {{ props.title }}
      </p>
      <div
        class="flex flex-row justify-center items-center py-2 text-xl font-bold text-center text-white uppercase bg-primary-500"
      >
        <span class="flex-1" v-for="item in itemKeys" :key="item">{{
          item
        }}</span>
      </div>
    </div>
    <div
      v-if="data.length === 0 && (isLoading ?? false) === false"
      class="flex overflow-hidden flex-col border-2 border-primary-500"
    >
      <slot name="fallback" />
    </div>

    <div
      v-for="[index, item] in Object.entries(data).slice(
        (selectedPage || 0) * pageSize,
        ((selectedPage || 0) + 1) * pageSize,
      )"
      :key="index"
    >
      <slot name="item" :index="Number(index)" :entry="item" />
    </div>
    <div class="inline-flex flex-row gap-2 mt-2">
      <!-- Pagination -->
      <template v-for="entryPage in pages" :key="entryPage">
        <button
          v-if="entryPage !== 'dot'"
          type="button"
          :class="`relative w-10 h-10 ${entryPage === selectedPage ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-500 hover:bg-primary-600'} text-white`"
          @click="
            () => {
              console.log(entryPage);
              selectedPage = entryPage;
              $emit('submit:page', entryPage);
            }
          "
        >
          <span>{{ entryPage + 1 }}</span>
        </button>
        <div v-else class="flex flex-col gap-2 w-10">
          <input
            type="text"
            inputmode="numeric"
            class="w-10 h-10 text-center border-2 border-primary-500"
            v-model="pickedJumpPage"
            placeholder="..."
          />
          <button
            type="button"
            class="inline-flex justify-center items-center w-10 h-10 text-white border-2 bg-primary-600 border-primary-500 hover:bg-primary-500"
            @click="
              () => {
                console.log(pickedJumpPage, isValid);
                if (!pickedJumpPage) return;
                if (!isValid) return;

                $emit('submit:page', pickedJumpPage);
                selectedPage = pickedJumpPage;
              }
            "
          >
            Go
          </button>
          <span
            v-if="!isValid"
            class="absolute right-1/2 top-full text-center text-red-500 translate-x-1/2"
          >
            Allowed range: {{ 1 }} - {{ props?.itemsCount || 1 }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
