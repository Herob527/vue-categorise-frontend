<script setup lang="ts">
import { axiosApi } from '@/axiosConfig';
import { API_URL } from '@/constants';
import { useQuery } from '@tanstack/vue-query';

const queryFn = async () => {
  try {
    const res = await axiosApi.get(`${API_URL}/bindings/count`);
    console.log(res.data);
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
    class="mb-4 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen bg-gray-500 bg-opacity-50 flex flex-col items-center justify-center"
    v-if="data === null"
  >
    <p class="text-red-500 bg-gray-300 px-8 py-4 font-bold">
      There was error while fetching bindings count.
    </p>
  </div>
  <div class="flex flex-row flex-wrap gap-4 justify-center">
    <router-link to="/startup">
      <p
        class="flex flex-col flex-1 justify-center items-center p-4 w-32 h-32 text-center bg-gray-200"
      >
        Go to startup
      </p>
    </router-link>
    <router-link :to="'/transcript'">
      <p
        class="flex flex-1 justify-center items-center p-4 w-32 h-32 text-center bg-gray-200"
      >
        Go to transcript
      </p>
    </router-link>
    <router-link :to="'/finalise'">
      <p
        class="flex flex-1 justify-center items-center p-4 w-32 h-32 text-center bg-gray-200"
      >
        Go to finalisation
      </p>
    </router-link>
    <router-link :to="'/configuration'">
      <p
        class="flex flex-1 justify-center items-center p-4 w-32 h-32 text-center bg-gray-200"
      >
        Go to configuration
      </p>
    </router-link>
  </div>
</template>
