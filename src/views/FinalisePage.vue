<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import { useRouter } from 'vue-router';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/vue-query';
import { post } from '@/actions/finalise';
import FormView from '@/components/Finalise/FormView.vue';
import { useFinaliseStore } from '@/stores/finaliseStore';

const router = useRouter();

const handleClick = () => {
  router.replace({ name: 'home' });
};

const store = useFinaliseStore();
const { mutate } = useMutation({
  mutationFn: () => post(store.$state),
});
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
  <main class="container flex mx-auto">
    <FormView @submit="mutate()" />
  </main>
</template>
