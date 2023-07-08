<script setup lang="ts">
import { axiosApi } from '@/axiosConfig';
import { API_URL } from '@/constants';
import { useQuery } from '@tanstack/vue-query';

const queryFn = async () => {
  const res = await axiosApi.get(`${API_URL}/bindings/count`);
  return res.data;
};

const { data } = useQuery({
  queryKey: ['bindingsCount'],
  queryFn,
});
</script>

<template>
  <div class="flex flex-row flex-wrap gap-4 justify-center">
    <router-link to="/startup">
      <p
        class="flex flex-col flex-1 justify-center items-center p-4 w-32 h-32 text-center bg-gray-200"
      >
        Go to startup
      </p>
    </router-link>
    <router-link :to="data > 0 ? '/transcript' : ''">
      <p
        class="flex flex-1 justify-center items-center p-4 w-32 h-32 text-center bg-gray-200"
      >
        Go to transcript
      </p>
    </router-link>
    <router-link :to="data > 0 ? '/finalise' : ''">
      <p
        class="flex flex-1 justify-center items-center p-4 w-32 h-32 text-center bg-gray-200"
      >
        Go to finalisation
      </p>
    </router-link>
    <router-link :to="data > 0 ? '/configuration' : ''">
      <p
        class="flex flex-1 justify-center items-center p-4 w-32 h-32 text-center bg-gray-200"
      >
        Go to configuration
      </p>
    </router-link>
  </div>
</template>
