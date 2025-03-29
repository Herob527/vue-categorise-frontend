<script setup lang="ts">
import { ENTRIES_PER_PAGE } from '@/constants';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getCount } from '@/actions/bindings';
import ActionButton from '@/components/ActionButton.vue';
import PaginationContainer from '@/components/Transcript/Pagination/PaginationContainer.vue';
import TranscriptList from '@/components/Transcript/TranscriptList.vue';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import OptionPanelContainer from '@/components/Transcript/OptionsPanel/OptionPanelContainer.vue';

import { getPaginated } from '@/actions/bindings';

const isOptionsOpen = ref(false);

const handleOptionClick = () => {
  isOptionsOpen.value = true;
};

const closeHandler = () => {
  isOptionsOpen.value = false;
};

const queryClient = useQueryClient();

const { data, isLoading } = useQuery({
  queryKey: ['count', 'get'],
  queryFn: () => getCount(),
});

const handleNewPage = (newPage: number) => {
  queryClient.fetchQuery({
    queryKey: ['get-paginated-transcript'],
    meta: {
      page: newPage,
      pageSize: ENTRIES_PER_PAGE,
    },
    queryFn: async ({ meta }) => {
      const { page, pageSize } = (meta as {
        page: number;
        pageSize: number;
      }) || {
        page: newPage,
        pageSize: ENTRIES_PER_PAGE,
      };
      return getPaginated({ page, pageSize });
    },
  });
};
</script>
<template>
  <div class="flex flex-row gap-4 px-2 pb-4 mx-auto">
    <ActionButton
      :on-click="handleOptionClick"
      class-name="bg-blue-500 text-white px-4 py-2 rounded-xl">
      <font-awesome-icon :icon="faGear" />
      Settings
    </ActionButton>
  </div>
  <main class="flex flex-col flex-1 gap-3 px-2 pb-4 mx-auto">
    <TranscriptList />
    <PaginationContainer
      v-if="data !== undefined"
      :count="data"
      :page-size="ENTRIES_PER_PAGE"
      storage-key="transcript"
      @change:page="handleNewPage" />
    <div v-else-if="isLoading">Loading...</div>
    <OptionPanelContainer
      v-if="isOptionsOpen"
      @close="closeHandler" />
  </main>
</template>
