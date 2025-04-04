<script setup lang="ts">
import { axiosApi } from '@/axiosConfig';
import { API_URL } from '@/constants';
import { useQuery } from '@tanstack/vue-query';

const queryFn = async () => {
  try {
    const res = await axiosApi.get(`${API_URL}/bindings/count`);
    return res.data;
  } catch (e) {
    return null;
  }
};

const { data, isLoading, isError } = useQuery({
  queryKey: ['bindingsCount'],
  queryFn,
});
</script>

<template>
  <div v-if="isLoading">Loading</div>
  <div v-else-if="isError">Error</div>
  <div v-else>Bindings: {{ data }}</div>
</template>
