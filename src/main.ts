import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

const API_PORT = '8000';
const API_HOST = 'http://localhost';

export const API_URL = `${API_HOST}:${API_PORT}`;
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.mount('#app');
