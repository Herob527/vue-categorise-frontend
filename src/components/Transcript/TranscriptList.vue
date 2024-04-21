<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getPaginated } from '@/actions/bindings';
import { ref } from 'vue';
import TranscriptItem from './TranscriptItem.vue';

const page = ref(1);
const pageSize = ref(10);

const { data, refetch } = useQuery({
  queryKey: ['get-paginated-transcript', page, pageSize],
  queryFn: async () =>
    getPaginated({ page: page.value, pageSize: pageSize.value }),
});
</script>
<template>
  <TranscriptItem
    v-for="entry in data"
    :key="entry.binding.id"
    :entry="entry"
  />
</template>
