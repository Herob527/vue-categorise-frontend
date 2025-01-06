<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { post } from '@/actions/finalise';
import FormView from '@/components/Finalise/FormView.vue';
import { useFinaliseStore } from '@/stores/finaliseStore';
import TranscriptPreview from '@/components/Finalise/Preview/TranscriptPreview.vue';
import DirectoriesPreview from '@/components/Finalise/Preview/DirectoriesPreview.vue';
import { useFinaliseRealPreviewStore } from '@/stores/finalisationDataStore';
import PreviewContainer from '@/components/Finalise/RealDataPreview/PreviewContainer.vue';

const previewStore = useFinaliseRealPreviewStore();

const store = useFinaliseStore();
const { mutate, status } = useMutation({
  mutationFn: () => post(store.$state),
  onSuccess: (result) => {
    previewStore.setData(result);
  },
});
</script>

<template>
  <main class="container flex flex-wrap gap-4 mx-auto">
    <FormView :submit-status="status" @submit="mutate()" />
    <TranscriptPreview />
    <DirectoriesPreview />
    <PreviewContainer />
  </main>
</template>
