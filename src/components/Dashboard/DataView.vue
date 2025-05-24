<script lang="ts" setup>
import type { DashboardModel } from '@/types/generated';
import { computed } from 'vue';

const props = defineProps<{ data: DashboardModel }>();

const processedData = computed(
  () =>
    ({
      categories_count: props.data.categories_count,
      total_bindings_count: props.data.total_bindings_count,
      category_with_most_bindings: props.data.category_with_most_bindings,
      uncategorizaed_count: props.data.uncategorizaed_count,
      categorized_count: props.data.categorized_count,
      total_audio_duration: props.data.total_audio_duration,
      filled_transcript_count: props.data.filled_transcript_count,
      empty_transcript_count: props.data.empty_transcript_count,
    }) as const satisfies Record<keyof DashboardModel, unknown>,
);
</script>

<template>
  <h1 class="text-4xl font-bold mb-4">Dashboard</h1>
  <div class="inline-grid grid-cols-2 grid-rows-2 gap-2">
    <div class="bg-primary-500 text-white p-4">
      <h2 class="text-2xl font-bold">Categorization progress</h2>
      <div class="flex flex-col">
        <span>Categorized lines: {{ processedData.categorized_count }}</span>
        <span
          >Uncategorized lines: {{ processedData.uncategorizaed_count }}</span
        >
      </div>
    </div>

    <div class="bg-primary-500 text-white p-4">
      <h2 class="text-2xl font-bold">Transcript progress</h2>
      <div class="flex flex-col">
        <span
          >Filled transcripts: {{ processedData.filled_transcript_count }}</span
        >
        <span
          >Empty transcripts: {{ processedData.empty_transcript_count }}</span
        >
      </div>
    </div>

    <div class="bg-primary-500 text-white p-4">
      <h2 class="text-2xl font-bold">Category data</h2>
      <div class="flex flex-col">
        <span>Categories count: {{ processedData.categories_count }}</span>
        <span v-if="processedData.category_with_most_bindings[0] !== ''"
          >Category with most bindings:
          {{ processedData.category_with_most_bindings[0] }} ({{
            processedData.category_with_most_bindings[1]
          }})</span
        >
        <span v-else>No categories assigned yet</span>
      </div>
    </div>
    <div class="bg-primary-500 text-white p-4">
      <h2 class="text-2xl font-bold">Audio data</h2>
      <span
        >Total audio duration:
        {{ processedData.total_audio_duration }} seconds</span
      >
    </div>
  </div>
</template>
