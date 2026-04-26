<script setup lang="ts">
import { ENTRIES_PER_PAGE, LOCALSTORAGE_PAGE_KEY } from '@/constants';
import { useQuery } from '@tanstack/vue-query';
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

const storageKey = `${LOCALSTORAGE_PAGE_KEY}-transcript`;

const page = ref(0);
const pageSize = ref(ENTRIES_PER_PAGE);

const { data, isLoading } = useQuery({
  queryKey: ['get-paginated-transcript', { page, pageSize }] as const,
  queryFn: async (params) => {
    const [, { page, pageSize }] = params.queryKey;
    return getPaginated({ page, pageSize });
  },
});

const handleNewPage = (newPage: number) => {
  page.value = newPage;
  localStorage.setItem(storageKey, `${newPage}`);
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
    <TranscriptList :data="data?.items ?? []" />
    <PaginationContainer
      v-if="data !== undefined"
      :count="data.pagination.total"
      :page-size="ENTRIES_PER_PAGE"
      storage-key="transcript"
      @change:page="handleNewPage" />

    <div v-else-if="isLoading">Loading...</div>
    <OptionPanelContainer
      v-if="isOptionsOpen"
      @close="closeHandler" />
  </main>
</template>
