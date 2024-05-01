import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => ({
    pageSize: 20,
    waveColor: '#2196f3',
    progressColor: '#0d47a1',
  }),
});
