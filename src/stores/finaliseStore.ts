import { defineStore } from 'pinia';

export const useFinaliseStore = defineStore('finalise', {
  state: () => ({
    line_format: '{file}|{text}',
    omit_empty: true,
    divide_by_category: true,
    category_to_lower: false,
    category_space_replacer: '_',
    export_transcript: true,
    uncategorized_name: 'Uncategorized',
  }),
});
