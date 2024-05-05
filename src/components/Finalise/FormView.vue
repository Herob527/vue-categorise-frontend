<script lang="ts" setup>
import { useFinaliseStore } from '@/stores/finaliseStore';

const entriesInLine = [
  'file',
  'text',
  'category',
  'category_index',
  'duration',
];

const values = useFinaliseStore();
</script>

<template>
  <section class="flex flex-col gap-2 p-2 border-2 border-primary-500">
    <h2 class="text-2xl font-bold">Finalise options</h2>
    <div class="flex flex-row gap-2">
      <input
        type="checkbox"
        name="omit_empty"
        id="omit_empty"
        class="border-2 border-primary-500"
        v-model="values.omit_empty"
      />
      <label for="omit_empty">Omit empty texts</label>
    </div>
    <div class="flex flex-row gap-2">
      <input
        type="checkbox"
        name="divide_by_category"
        id="divide_by_category"
        class="border-2 border-primary-500"
        v-model="values.divide_by_category"
      />
      <label for="divide_by_category">Divide by category</label>
    </div>

    <div class="flex flex-row gap-2">
      <input
        type="checkbox"
        name="export_transcript"
        id="export_transcript"
        class="border-2 border-primary-500"
        v-model="values.export_transcript"
      />
      <label for="export_transcript">Export transcript</label>
    </div>
    <div class="flex flex-col gap-1">
      <label for="uncategorized_name">Uncategorized name:</label>
      <input
        type="text"
        name="uncategorized_name"
        id="uncategorized_name"
        class="p-2 w-min border-2 border-primary-500"
        v-model="values.uncaterized_name"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="line_format">Line format:</label>
      <input
        type="text"
        name="line_format"
        id="line_format"
        class="p-2 w-min border-2 border-primary-500"
        v-model="values.line_format"
      />
    </div>
    <div class="flex flex-row gap-2">
      <button type="button" class="flex-1 p-2 text-white bg-blue-500">
        Submit
      </button>
      <button type="button" class="flex-1 p-2 text-white bg-blue-500">
        Preview
      </button>
    </div>
  </section>
</template>
