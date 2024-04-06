<script setup lang="ts">
import { getAll } from '@/actions/bindings';
import { useQuery } from '@tanstack/vue-query';

const { data } = useQuery({
  queryKey: ['bindings'],
  queryFn: async () => getAll(),
});
</script>

<template>
  <ol v-for="item in data" v-bind:key="item.bindings.id">
    <li>{{ item.categories }}</li>
  </ol>
</template>
