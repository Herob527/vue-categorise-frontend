import { defineStore } from 'pinia';

export const useFinaliseStore = defineStore('finalise', {
  state: () => ({
    line_format: '{file}|{text}',
    omit_empty: true,
    divide_by_category: true,
    export_transcript: true,
    uncaterized_name: 'Uncategorized',
  }),
});
