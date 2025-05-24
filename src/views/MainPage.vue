<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { get } from '@/actions/dashboard';
import DataView from '@/components/Dashboard/DataView.vue';

const queryFn = async () => get();

const { data, isLoading, isError } = useQuery({
  queryKey: ['bindingsCount'],
  queryFn,
});
</script>

<template>
  <div v-if="isLoading">Loading</div>
  <div v-else-if="isError">Error</div>
  <DataView
    v-else-if="data"
    :data="data" />
</template>
