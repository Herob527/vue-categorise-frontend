<script setup lang="ts">
import { LOCALSTORAGE_PAGE_KEY } from '@/constants';
import PaginationEntry from './PaginationEntry.vue';
import { computed, ref, watchEffect } from 'vue';
import PageJumper from './PageJumper.vue';

const {
  count,
  pageSize,
  storageKey: key,
  page,
} = defineProps<{
  count: number;
  pageSize: number;
  storageKey: string;
  page?: number;
}>();

const storageKey = `${LOCALSTORAGE_PAGE_KEY}-${key}`;

const currentPageFromStorage = parseInt(
  localStorage.getItem(storageKey) || '0',
  10,
);

const currentAmountOfPages = computed(() => {
  const calculated = Math.trunc((count ?? 0) / pageSize);
  // Edge case, when count is divisible by page size
  if (count % pageSize === 0) return calculated - 1;
  return calculated;
});

const usedPage = computed(() => {
  const newPage = page ?? currentPageFromStorage;

  if (newPage >= currentAmountOfPages.value) {
    localStorage.setItem(storageKey, `${newPage}`);
    return currentAmountOfPages.value;
  }
  return newPage;
});

const currentPage = ref(usedPage.value);

watchEffect(() => {
  currentPage.value = usedPage.value;
});

const saveCurrentPage = (newPage: number) => {
  currentPage.value = newPage;
  localStorage.setItem(storageKey, `${newPage}`);
};

const JUMP_MARK = '...';

const processPageIndexed = (
  currentPage: number,
  currentAmountOfPages: number,
): (typeof JUMP_MARK | number)[] => {
  if (currentAmountOfPages < 5)
    return Array(currentAmountOfPages >= 1 ? currentAmountOfPages : 0)
      .fill(0)
      .map((_, index) => index);
  if (currentPage < 2) {
    return [0, 1, 2, JUMP_MARK, currentAmountOfPages];
  }
  if (currentPage === currentAmountOfPages)
    return [0, JUMP_MARK, currentPage - 2, currentPage - 1, currentPage];
  if (currentPage + 2 === currentAmountOfPages) {
    return [
      0,
      JUMP_MARK,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }
  if (currentPage + 1 === currentAmountOfPages)
    return [0, JUMP_MARK, currentPage - 1, currentPage, currentPage + 1];
  return [
    0,
    JUMP_MARK,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    JUMP_MARK,
    currentAmountOfPages,
  ];
};
const paginationData = computed(() => {
  return processPageIndexed(currentPage.value, currentAmountOfPages.value);
});

defineEmits<{
  (e: 'change:page', value: number): void;
}>();
</script>
<template>
  <footer class="flex gap-2 justify-center items-start">
    <template
      v-for="dataPage in paginationData"
      :key="dataPage">
      <PaginationEntry
        v-if="dataPage !== JUMP_MARK"
        :class-name="
          currentPage === dataPage ? 'bg-primary-500' : 'bg-primary-600'
        "
        :page="dataPage"
        @click="
          (newPage: number) => {
            saveCurrentPage(newPage);
            $emit('change:page', newPage);
          }
        " />

      <PageJumper
        v-else
        :min="0"
        :max="currentAmountOfPages + 1"
        @submit="
          (newPage: number) => {
            saveCurrentPage(newPage);
            $emit('change:page', newPage);
          }
        " />
    </template>
  </footer>
</template>
