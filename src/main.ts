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

const app = createApp(App);

app.use(VueVirtualScroller);
library.add(fas);

config.styleDefault = 'solid';

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
