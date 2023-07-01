import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MainPage.vue'),
    },
    {
      path: '/startup',
      name: 'startup',
      component: () => import('../views/StartupProject.vue'),
    },
    {
      path: '/transcript',
      name: 'transcript',
      component: () => import('../views/Transcript.vue'),
    },
    {
      path: '/finalise',
      name: 'finalise',
      component: () => import('../views/Finalise.vue'),
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: () => import('../views/Configuration.vue'),
    },
  ],
});

export default router;
