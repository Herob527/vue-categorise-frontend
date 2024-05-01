import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
import VueVirtualScroller from 'vue-virtual-scroller';
import { createI18n } from 'vue-i18n';
import enUs from './locale/en-US.json';
import type { MessageSchema } from './locale/schema';

const app = createApp(App);
const i18n = createI18n<{
  message: MessageSchema;
}>({
  locale: 'en-US',
  legacy: false,
  messages: {
    'en-US': enUs,
  },
});

app.use(VueVirtualScroller);
app.use(i18n);

config.styleDefault = 'solid';

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
