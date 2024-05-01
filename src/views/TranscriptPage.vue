<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import PaginationContainer from '@/components/Transcript/Pagination/PaginationContainer.vue';
import TranscriptList from '@/components/Transcript/TranscriptList.vue';
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
  <main class="flex flex-col flex-1 gap-3 px-2 mx-auto mb-4">
    <TranscriptList />
    <PaginationContainer />
  </main>
</template>
