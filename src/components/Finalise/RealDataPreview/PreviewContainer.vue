<script setup lang="ts">
import { useFinaliseRealPreviewStore } from '@/stores/finalisationDataStore';
import DirectoryItem from '../Preview/DirectoriesPreview/DirectoryItem.vue';
import FileIcon from '../Preview/DirectoriesPreview/FileIcon.vue';
import { useMutation } from '@tanstack/vue-query';
import { getLink } from '@/actions/finalise';

const store = useFinaliseRealPreviewStore();
const { mutateAsync } = useMutation({
  mutationFn: (objectName: string) => {
    return getLink(objectName);
  },
});
</script>
<template>
  <section
    class="container flex overflow-scroll flex-col rounded-xl border-2 h-min max-h-[500px] border-primary-500">
    <header class="flex justify-between flex-row p-2">
      <h2 class="text-2xl font-bold">Folder preview (Real)</h2>
      <button
        type="button"
        class="text-white px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-full"
        @click="
          async () => {
            const link = await mutateAsync('temp');
            console.log(link);
          }
        ">
        Download
      </button>
    </header>
    <div class="flex flex-col flex-wrap gap-3 px-2 pb-2">
      <template v-if="store.processedData">
        <template
          v-for="[index, category] in Object.entries(store.processedData.files)"
          :key="category.isDirectory ? category.dirName : category.fileName">
          <DirectoryItem
            v-if="category.isDirectory"
            :name="category.dirName"
            :data="category.files" />

          <div
            v-else
            class="flex flex-row flex-1 gap-2 items-center py-3 px-4 rounded-xl border-2 border-primary-500">
            <FileIcon
              :file-name="category.fileName"
              :is-even-index="Number(index) % 2 === 0" />
            <span>{{ category.fileName }} </span>
          </div>
        </template>
      </template>
      <template v-else>
        <p>Data not there yet</p>
      </template>
    </div>
  </section>
</template>
