<script setup lang="ts">
import { useFinaliseRealPreviewStore } from '@/stores/finalisationDataStore';
import DirectoryItem from '../Preview/DirectoriesPreview/DirectoryItem.vue';
import FileIcon from '../Preview/DirectoriesPreview/FileIcon.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import finalize from '@/actions/finalise';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { ExportStatus, type ExportModel } from '@/types/generated';

const store = useFinaliseRealPreviewStore();
const queryClient = useQueryClient();

const { mutateAsync: schedule } = useMutation({
  mutationFn: (category: string) => finalize.schedule([category]),
  onSuccess: () => {
    const now = new Date().toISOString();
    const newEntry: ExportModel = {
      id: crypto.randomUUID(),
      status: ExportStatus.NUMBER_0,
      created_at: now,
      updated_at: now,
      archive_url: null,
    };
    queryClient.setQueryData<ExportModel[]>(['finalize-get-all'], (old) => [
      newEntry,
      ...(old ?? []),
    ]);
  },
});
</script>
<template>
  <section
    class="container flex overflow-scroll flex-col rounded-xl border-2 h-min max-h-125 border-primary-500">
    <header class="flex justify-between flex-row p-2">
      <h2 class="text-2xl font-bold">Folder preview (Real)</h2>
    </header>
    <div class="flex flex-col flex-wrap gap-3 px-2 pb-2">
      <template v-if="store.processedData">
        <template
          v-for="[index, category] in Object.entries(store.processedData.files)"
          :key="category.isDirectory ? category.dirName : category.fileName">
          <DirectoryItem
            v-if="category.isDirectory"
            :name="category.dirName"
            :data="category.files">
            <template #buttons>
              <button
                type="button"
                class="group flex flex-row gap-2 items-center hover:bg-primary-500 hover:text-white p-2 rounded-md cursor-pointer"
                @click="() => schedule(category.categoryId)">
                <font-awesome-icon
                  width="16"
                  :icon="faBoxArchive"
                  class="group-hover:text-white text-primary-600" />
              </button>
            </template>
          </DirectoryItem>

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
