<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import DataView from '@/components/Dashboard/DataView.vue';
import dashboard from '@/actions/dashboard';

const queryFn = async () => dashboard.get();

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
