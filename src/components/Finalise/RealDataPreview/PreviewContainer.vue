<script setup lang="ts">
import { useFinaliseRealPreviewStore } from '@/stores/finalisationDataStore';
import DirectoryItem from '../Preview/DirectoriesPreview/DirectoryItem.vue';
import FileIcon from '../Preview/DirectoriesPreview/FileIcon.vue';

const store = useFinaliseRealPreviewStore();
</script>
<template>
  <section
    class="container flex overflow-scroll flex-col rounded-xl border-2 h-min max-h-[500px] border-primary-500"
  >
    <h2 class="px-2 my-2 text-2xl font-bold">Folder preview (Real)</h2>
    <div class="flex flex-col flex-wrap gap-3 px-2 pb-2">
      <template v-if="store.processedData">
        <template
          v-for="[index, category] in Object.entries(store.processedData.files)"
          :key="category.isDirectory ? category.dirName : category.fileName"
        >
          <DirectoryItem
            v-if="category.isDirectory"
            :name="category.dirName"
            :data="category.files"
          />

          <div
            class="flex flex-row flex-1 gap-2 items-center py-3 px-4 rounded-xl border-2 border-primary-500"
            v-else
          >
            <FileIcon
              :file-name="category.fileName"
              :is-even-index="Number(index) % 2 === 0"
            />
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
