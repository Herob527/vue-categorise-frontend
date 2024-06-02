<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  faChalkboard,
  faClipboard,
  faFileLines,
  faTruckFast,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const routeData = useRoute();

type RouteEntryType = {
  icon: IconDefinition;
  link: string;
  text: string;
};

const routes = [
  {
    icon: faChalkboard,
    link: '/',
    text: 'Dashboard',
  },
  {
    icon: faClipboard,
    link: '/startup',
    text: 'Startup',
  },
  {
    icon: faFileLines,
    link: '/transcript',
    text: 'Transcript',
  },
  {
    icon: faTruckFast,
    link: '/finalise',
    text: 'Finalise',
  },
] as const satisfies RouteEntryType[];
</script>
<template>
  <nav class="inline-flex flex-col gap-4 h-svh bg-primary-500 min-w-36">
    <h2 class="px-4 mt-4 text-3xl font-bold text-white">Menu</h2>
    <div class="inline-flex flex-col flex-1 gap-4 mx-2 text-left">
      <router-link :to="route.link" v-for="route in routes" :key="route.text">
        <button
          :class="`py-2 flex flex-row gap-3 items-center justify-start px-4 w-full text-left rounded-xl  ${route.link === routeData.path ? 'font-bold bg-white text-primary-600' : 'text-white hover:bg-primary-600'}`"
          type="button"
        >
          <font-awesome-icon :icon="route.icon" width="16" />
          <span class="flex-1 font-bold uppercase">{{ route.text }}</span>
        </button>
      </router-link>
    </div>
  </nav>
</template>
