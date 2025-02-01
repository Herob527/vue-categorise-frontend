<script setup lang="ts" generic="T">
import { splitToPages } from '@/utils/splitToPages';
import { computed, ref } from 'vue';

const props = defineProps<{
  data: T[];
  className?: string;
  title?: string;
  itemKeys?: string[] | readonly string[];
  itemsCount?: number;
  isLoading?: boolean;
  pageSize?: number;
}>();

const itemsCount = computed(() => props.data?.length);

const DEFAULT_PAGE_SIZE = 10;

defineEmits<{
  'submit:page': [value: number];
}>();

const selectedPage = ref<number>(0);
const pickedJumpPage = ref<number | null>(null);

const pages = computed(() =>
  itemsCount.value
    ? splitToPages({
        amountOfEntries: itemsCount.value,
        selectedPage: selectedPage.value,
        pageSize: props.pageSize || DEFAULT_PAGE_SIZE,
      })
    : [],
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
  <div :class="props.className">
    <div class="flex flex-col">
      <slot
        v-if="typeof props.title !== 'string'"
        name="top-heading" />
      <!-- Heading -->
      <p
        v-else
        class="p-2 text-2xl font-bold text-white uppercase bg-primary-600">
        {{ props.title }}
      </p>
      <div
        class="flex flex-row justify-center items-center py-2 text-xl font-bold text-center text-white uppercase bg-primary-500">
        <span
          v-for="item in itemKeys"
          :key="item"
          class="flex-1"
          >{{ item }}</span
        >
      </div>
    </div>
    <div
      v-if="data.length === 0 && (isLoading ?? false) === false"
      class="flex overflow-hidden flex-col border-2 border-primary-500">
      <slot name="fallback" />
    </div>

    <template v-if="(isLoading ?? false) === false">
      <div
        v-for="[index, item] in Object.entries(data).slice(
          (selectedPage || 0) * (pageSize || DEFAULT_PAGE_SIZE),
          ((selectedPage || 0) + 1) * (pageSize || DEFAULT_PAGE_SIZE),
        )"
        :key="index">
        <slot
          name="item"
          :index="Number(index)"
          :entry="item" />
      </div>
    </template>
    <template v-else>
      <div
        v-for="index in pageSize || DEFAULT_PAGE_SIZE"
        :key="index"
        class="flex flex-col">
        <slot
          v-if="$slots['loadingItem']"
          name="loadingItem"
          :index="index" />
        <span
          v-else
          :class="`w-full ${index % 2 == 1 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'} h-[50px] animate-pulse`"
          >&nbsp;</span
        >
      </div>
    </template>
    <div class="inline-flex flex-row gap-2 mt-2">
      <!-- Pagination -->
      <template
        v-for="entryPage in pages"
        :key="entryPage">
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
          ">
          <span>{{ entryPage + 1 }}</span>
        </button>
        <div
          v-else
          class="flex flex-col gap-2 w-10">
          <input
            v-model="pickedJumpPage"
            type="text"
            inputmode="numeric"
            class="w-10 h-10 text-center border-2 border-primary-500"
            placeholder="..." />
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
            ">
            Go
          </button>
          <span
            v-if="!isValid"
            class="absolute right-1/2 top-full text-center text-red-500 translate-x-1/2">
            Allowed range: {{ 1 }} - {{ props?.itemsCount || 1 }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
