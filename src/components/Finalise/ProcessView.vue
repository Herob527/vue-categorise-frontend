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

<template>
  <div>
    <p>{{ data }}</p>
  </div>
</template>
