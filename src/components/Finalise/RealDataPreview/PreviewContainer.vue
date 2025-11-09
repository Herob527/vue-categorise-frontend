<script setup lang="ts">
import { useFinaliseRealPreviewStore } from '@/stores/finalisationDataStore';
import DirectoryItem from '../Preview/DirectoriesPreview/DirectoryItem.vue';
import FileIcon from '../Preview/DirectoriesPreview/FileIcon.vue';
import { useMutation } from '@tanstack/vue-query';
import { download } from '@/actions/finalise';

const store = useFinaliseRealPreviewStore();
const { mutateAsync: getArchive } = useMutation({
  mutationFn: () => {
    return download();
  },
});
const onDownload = async () => {
  const data = await getArchive();
  const blob = new Blob([data], { type: 'application/zip' });
  const test = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = test;
  link.download = 'transcript.zip';
  link.click();
};
</script>
<template>
  <section
    class="container flex overflow-scroll flex-col rounded-xl border-2 h-min max-h-[500px] border-primary-500">
    <header class="flex justify-between flex-row p-2">
      <h2 class="text-2xl font-bold">Folder preview (Real)</h2>
      <button
        type="button"
        class="text-white px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-full"
        @click="onDownload">
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
