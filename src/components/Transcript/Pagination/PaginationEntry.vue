<script setup lang="ts">
import { getPaginated } from '@/actions/bindings';
import { ENTRIES_PER_PAGE } from '@/constants';
import { useQueryClient } from '@tanstack/vue-query';

const props = defineProps<{
  page: number;
  offset: number;
  className?: string;
}>();

const queryClient = useQueryClient();

const handleClick = () => {
  queryClient.fetchQuery({
    queryKey: ['get-paginated-transcript'],
    meta: {
      page: props.page,
      pageSize: ENTRIES_PER_PAGE,
    },
    queryFn: async ({ meta }) => {
      const { page, pageSize } = (meta as {
        page: number;
        pageSize: number;
      }) || {
        page: props.page,
        pageSize: ENTRIES_PER_PAGE,
      };
      return getPaginated({ page, pageSize });
    },
  });
};
</script>
<template>
  <button
    type="button"
    :class="`relative p-5 text-white bg-primary-500 ${className || ''}`"
    @click="
      () => {
        $emit('click', props.page);
        handleClick();
      }
    "
  >
    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {{ page }}
    </span>
  </button>
</template>
