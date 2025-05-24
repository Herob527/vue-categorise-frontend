<script lang="ts" setup>
import type { DashboardModel } from '@/types/generated';
import { computed } from 'vue';
import DashboardCard from './DashboardCard.vue';
import {
  faFileAudio,
  faKeyboard,
  faList,
  faTableList,
} from '@fortawesome/free-solid-svg-icons';

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
  <div
    class="inline-grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 gap-2">
    <DashboardCard
      title="Categorization progress"
      :icon="faList">
      <div class="flex flex-col">
        <span
          >Categorized lines: <b>{{ processedData.categorized_count }}</b></span
        >
        <span
          >Uncategorized lines:
          <b>{{ processedData.uncategorizaed_count }}</b></span
        >
      </div>
    </DashboardCard>

    <DashboardCard
      title="Transcript progress"
      :icon="faKeyboard">
      <div class="flex flex-col">
        <span
          >Filled transcripts:
          <b>{{ processedData.filled_transcript_count }}</b></span
        >
        <span
          >Empty transcripts:
          <b>{{ processedData.empty_transcript_count }}</b></span
        >
      </div>
    </DashboardCard>
    <DashboardCard
      title="Category data"
      :icon="faTableList">
      <div class="flex flex-col">
        <span
          >Categories count: <b>{{ processedData.categories_count }}</b></span
        >
        <span v-if="processedData.category_with_most_bindings[0] !== ''"
          >Category with most bindings:
          <b
            >{{ processedData.category_with_most_bindings[0] }} ({{
              processedData.category_with_most_bindings[1]
            }})</b
          ></span
        >
        <span v-else>No categories assigned yet</span>
      </div>
    </DashboardCard>

    <DashboardCard
      title="Audio data"
      :icon="faFileAudio">
      <span
        >Total audio duration:
        <b>{{ processedData.total_audio_duration }} seconds</b></span
      >
    </DashboardCard>
  </div>
</template>
