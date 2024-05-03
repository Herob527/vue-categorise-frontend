<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue';
import PaginationContainer from '@/components/Transcript/Pagination/PaginationContainer.vue';
import TranscriptList from '@/components/Transcript/TranscriptList.vue';
import { useRouter } from 'vue-router';
import { faArrowLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import OptionPanelContainer from '@/components/Transcript/OptionsPanel/OptionPanelContainer.vue';

const router = useRouter();

const handleClick = () => {
  router.replace({ name: 'home' });
};

const isOptionsOpen = ref(false);

const handleOptionClick = () => {
  isOptionsOpen.value = true;
};

const closeHandler = () => {
  isOptionsOpen.value = false;
};
</script>
<template>
  <nav class="flex flex-row gap-4 py-4 px-2 mx-auto">
    <ActionButton
      :onClick="handleClick"
      class-name="bg-blue-500 text-white px-4 py-2 rounded-xl"
    >
      <font-awesome-icon :icon="faArrowLeft" />
      Go home
    </ActionButton>
    <ActionButton
      :onClick="handleOptionClick"
      class-name="bg-blue-500 text-white px-4 py-2 rounded-xl"
    >
      <font-awesome-icon :icon="faGear" />
      Settings
    </ActionButton>
  </nav>
  <main class="flex flex-col flex-1 gap-3 px-2 pb-4 mx-auto">
    <TranscriptList />
    <PaginationContainer />
    <OptionPanelContainer v-if="isOptionsOpen" @close="closeHandler" />
  </main>
</template>
