<script setup lang="ts">
import finalize from '@/actions/finalise';
import { useQuery } from '@tanstack/vue-query';

const { data } = useQuery({
  queryKey: ['finalize-get-all'],
  queryFn: () => finalize.getAll(),
});

const handleClick = async (exportId: string) => {
  const data = await finalize.download({ exportId });
  const url = URL.createObjectURL(data);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${exportId}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<template v-if="data && Array.isArray(data)">
  <div
    v-for="item in data"
    :key="item.id"
    class="grid grid-cols-4 gap-4 items-center justify-center">
    <span>{{ item.created_at }}</span>
    <span>{{ item.updated_at }}</span>
    <span>{{ item.status }}</span>
    <button
      type="button"
      class="p-4 rounded-xl relative bg-primary-500 w-fit hover:bg-primary-600 cursor-pointer text-white flex"
      @click="() => handleClick(item.id)">
      <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        P
      </span>
    </button>
  </div>
</template>
