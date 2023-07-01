<script setup lang="ts">
import { axiosApi } from '@/axiosConfig';
import { API_URL } from '@/constants';
import router from '@/router';
import { useQuery } from '@tanstack/vue-query';
import { onUpdated } from 'vue';

const queryFn = async () => {
  const res = await axiosApi.get(`${API_URL}/bindings/count`);
  return res.data;
};

const { data, isLoading, isError } = useQuery({
  queryKey: ['bindingsCount'],
  queryFn,
});

onUpdated(() => {
  const count = data.value;
  if (count === 0) {
    router.replace('/startup');
  } else if (count > 0) {
    router.replace('/transcription');
  }
});
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error!</span>
  <span v-else>{{ data }}</span>
</template>
