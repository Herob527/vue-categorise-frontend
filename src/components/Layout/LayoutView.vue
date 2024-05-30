<script setup lang="ts">
import SideMenu from './SideMenu.vue';
</script>
<template>
  <div class="flex flex-row h-svh">
    <SideMenu />
    <div class="overflow-scroll flex-1 p-2">
      <slot />
    </div>
  </div>
</template>
