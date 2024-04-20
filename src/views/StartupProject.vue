<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import AudioList from '@/components/Startup/AudioList.vue';
import TableActionPanel from '@/components/Startup/TableActionPanel.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const handleClick = () => {
  router.replace({ name: 'home' });
};
</script>
<template>
  <nav class="container my-4 mx-auto">
    <ActionButton
      :onClick="handleClick"
      class-name="bg-blue-500 text-white px-4 py-2 rounded-xl"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
      Go home
    </ActionButton>
  </nav>
  <main class="mb-4">
    <TableActionPanel />
    <AudioList />
  </main>
</template>
