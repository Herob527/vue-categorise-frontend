<script setup lang="ts">
import { useFinaliseRealPreviewStore } from '@/stores/finalisationDataStore';
import DirectoryItem from '../Preview/DirectoriesPreview/DirectoryItem.vue';
import FileIcon from '../Preview/DirectoriesPreview/FileIcon.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import finalize from '@/actions/finalise';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { ExportStatus, type ExportModel } from '@/types/generated';
import { useFinaliseStore } from '@/stores/finaliseStore';
import { ref } from 'vue';

const store = useFinaliseRealPreviewStore();
const values = useFinaliseStore();
const queryClient = useQueryClient();

const selectedCategories = ref<Set<string>>(new Set());

const { mutateAsync: schedule } = useMutation({
  mutationFn: (category: string[]) => {
    console.log(category);
    return finalize.schedule(category, values.$state);
  },
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
        <div class="space-x-2">
          <input
            type="checkbox"
            @change="
              () => {
                const allIds = new Set(
                  store.processedData?.files
                    ?.filter((el) => el.isDirectory)
                    ?.flatMap((el) => el.categoryId) ?? [],
                );
                if (allIds.size === selectedCategories.size) {
                  selectedCategories = new Set();
                } else {
                  allIds.forEach((category) =>
                    selectedCategories.add(category),
                  );
                }
              }
            " /><span>Select all</span>
        </div>
        <template
          v-for="[index, category] in Object.entries(store.processedData.files)"
          :key="category.isDirectory ? category.dirName : category.fileName">
          <div v-if="category.isDirectory">
            <DirectoryItem
              :selectable="true"
              :is-selected="selectedCategories.has(category.categoryId)"
              :name="category.dirName"
              :data="category.files"
              @select="
                () => {
                  if (selectedCategories.has(category.categoryId)) {
                    selectedCategories.delete(category.categoryId);
                  } else {
                    selectedCategories.add(category.categoryId);
                  }
                }
              ">
              <template #buttons>
                <button
                  type="button"
                  class="group flex flex-row gap-2 items-center hover:bg-primary-500 hover:text-white p-2 rounded-md cursor-pointer"
                  @click="() => schedule([category.categoryId])">
                  <font-awesome-icon
                    width="16"
                    :icon="faBoxArchive"
                    class="group-hover:text-white text-primary-600" />
                </button>
              </template>
            </DirectoryItem>
          </div>

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
    <button
      v-if="selectedCategories.size > 0"
      class="bg-primary-500 px-4 py-2 rounded-xl w-fit ml-2 text-white mt-2"
      @click="
        () => {
          schedule(Array.from(selectedCategories));
          selectedCategories.clear();
        }
      ">
      Submit all
    </button>
  </section>
</template>
