import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import VueVirtualScroller from 'vue-virtual-scroller';
import { createI18n } from 'vue-i18n';
import enUs from './locale/en-US.json';
import plPl from './locale/pl-PL.json';
import type { MessageSchema } from './locale/schema';

const app = createApp(App);
const i18n = createI18n<{
  message: MessageSchema;
}>({
  locale: 'en-US',
  legacy: false,
  messages: {
    'en-US': enUs,
    'pl-PL': plPl,
  },
});

app.use(VueVirtualScroller);
app.use(i18n);
library.add(fas);

config.styleDefault = 'solid';

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
