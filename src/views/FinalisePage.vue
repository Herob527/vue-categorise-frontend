<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { useRouter } from 'vue-router';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
      <font-awesome-icon :icon="faArrowLeft" />
      Go home
    </ActionButton>
  </nav>
  <main>
    <p>Test</p>
  </main>
</template>
