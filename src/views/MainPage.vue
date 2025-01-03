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

const { data } = useQuery({
  queryKey: ['bindingsCount'],
  queryFn,
});

</script>

<template>
  <div
    v-if="data === null"
    class="flex absolute top-1/2 left-1/2 flex-col justify-center items-center mb-4 w-screen h-screen text-center bg-gray-500 bg-opacity-50 -translate-x-1/2 -translate-y-1/2"
  >
    <p class="py-4 px-8 font-bold text-red-500 bg-gray-300">
      There was error while fetching bindings count.
    </p>
    <p>Try again later</p>
  </div>
  <div class="flex flex-row flex-wrap gap-4 justify-center">
    <p>Welcome</p>
  </div>
</template>
