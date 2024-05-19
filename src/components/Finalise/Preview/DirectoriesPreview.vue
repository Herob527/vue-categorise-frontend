<script setup lang="ts">
import { useFinalisePreviewStore } from '@/stores/previewStore';
import DirectoryItem from './DirectoriesPreview/DirectoryItem.vue';
import type { DataProp, DirectoryShape, FileShape } from '@/types/shared';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useFinaliseStore } from '@/stores/finaliseStore';

const { filteredData } = storeToRefs(useFinalisePreviewStore());
const { export_transcript, divide_by_category } =
  storeToRefs(useFinaliseStore());

const getDataForCategory = (category: string) =>
  filteredData.value
    .filter((d) => d.category === category)
    .map(
      (entry) =>
        ({
          fileName: entry.fileName,
          isDirectory: false,
        }) satisfies FileShape,
    );

const getDataProps = computed(
  () => (category?: string) =>
    [
      ...[
        {
          dirName: 'wavs',
          files:
            divide_by_category.value && category
              ? getDataForCategory(category)
              : filteredData.value.map(
                  (entry) =>
                    ({
                      fileName: entry.fileName,
                      isDirectory: false,
                    }) satisfies FileShape,
                ),
          isDirectory: true,
        } satisfies DirectoryShape,
      ],

      ...(export_transcript.value
        ? [
            {
              fileName: 'transcript.txt',
              isDirectory: false,
            } satisfies FileShape,
          ]
        : []),
    ] satisfies DataProp[],
);

const categories = computed(() => [
  ...new Set(filteredData.value.map((entry) => entry.category)),
]);
</script>

<template>
  <div class="flex flex-col flex-wrap gap-4 max-h-[500px]">
    <template v-if="divide_by_category">
      <DirectoryItem
        v-for="category in categories"
        :key="category"
        :name="category"
        :data="getDataProps(category)"
      />
    </template>
    <template v-else>
      <DirectoryItem :name="'(root)'" :data="getDataProps()" />
    </template>
  </div>
</template>
