<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import PaginationContainer from '@/components/Transcript/Pagination/PaginationContainer.vue';
import TranscriptList from '@/components/Transcript/TranscriptList.vue';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import OptionPanelContainer from '@/components/Transcript/OptionsPanel/OptionPanelContainer.vue';

const isOptionsOpen = ref(false);

const handleOptionClick = () => {
  isOptionsOpen.value = true;
};

const closeHandler = () => {
  isOptionsOpen.value = false;
};
</script>
<template>
  <div class="flex flex-row gap-4 px-2 pb-4 mx-auto">
    <ActionButton
      :on-click="handleOptionClick"
      class-name="bg-blue-500 text-white px-4 py-2 rounded-xl"
    >
      <font-awesome-icon :icon="faGear" />
      Settings
    </ActionButton>
  </div>
  <main class="flex flex-col flex-1 gap-3 px-2 pb-4 mx-auto">
    <TranscriptList />
    <PaginationContainer />
    <OptionPanelContainer v-if="isOptionsOpen" @close="closeHandler" />
  </main>
</template>
