<script setup lang="ts">
import finalize from '@/actions/finalise';
import { useQuery } from '@tanstack/vue-query';

const { data } = useQuery({
  queryKey: ['finalize-get-all'],
  queryFn: () => {
    return finalize.getAll();
  },
});
</script>

<template v-if="data && Array.isArray(data)">
  <div
    v-for="item in data"
    :key="item.id"
    class="grid grid-cols-4 gap-4">
    <span>{{ item.created_at }}</span>
    <span>{{ item.updated_at }}</span>
    <span>{{ item.status }}</span>
    <span>{{ item.archive_url }}</span>
  </div>
</template>
