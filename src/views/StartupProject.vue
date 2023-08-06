<script setup lang="ts">
import CategoryEntry from '@/components/Startup/CategoryEntry.vue';
import CreateCategory from '@/components/Startup/CreateCategory.vue';
import AddToDb from '@/components/Startup/AddToDb.vue';
import { useBindings } from '@/hooks/useBindings';
import { useCategories } from '@/hooks/useCategories';
import { useAudioFilesStore } from '@/stores/audioFiles';
import { onUpdated } from 'vue';
import axios from 'axios';
import { generateId } from '@/utils/generateId';

const { add } = useAudioFilesStore();

const { useGetAll: useGetCategories } = useCategories();
const { useGetAll } = useBindings();

const { data, isLoading, isSuccess } = useGetCategories();
const { data: bindings } = useGetAll();

const getAudio = async (url: string) => {
  const response = await axios.get(`http://localhost:8000/${url}`, {
    headers: {
      'Content-Type': 'audio/*',
    },
    responseType: 'blob',
  });
  return response;
};
onUpdated(async () => {
  if (!bindings.value) return;
  const mappedData = (bindings.value as any[]).map(async (b) => {
    const { Bindings, Categories, Audios } = b;
    const audio = await getAudio(Audios.url);
    const audioFile = new File([audio.data], Audios.file_name, {
      type: audio.data.type,
    });
    const bindingsId: string = Bindings.id;
    const category: string = Categories.name;
    return { audioFile, category, bindingsId };
  });
  const resolved = await Promise.all(mappedData);
  resolved.forEach((el) => {
    const id = generateId(el.audioFile);
    add(el.audioFile, id, el.category, 'onServer');
  });
});
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isSuccess" class="container mx-auto">
    <div v-if="data.length > 0 && bindings" class="flex flex-col gap-4">
      <div v-for="category in data" :key="category.name">
        <CategoryEntry :category="category" />
      </div>
    </div>
    <div v-else class="p-4 mx-auto bg-gray-200 rounded-xl text-slate-500">
      <span>No categories there</span>
    </div>
    <div class="flex flex-wrap gap-4 mt-4 md:flex-nowrap">
      <AddToDb />
      <CreateCategory />
    </div>
  </div>
</template>
