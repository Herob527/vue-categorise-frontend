<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import AudioItem from './AudioItem.vue';
import CategoryItem from './CategoryItem.vue';
import TextItem from './TextItem.vue';
import type { BindingModel } from '@/types/generated';
import {
  removeCategoryFromBinding,
  updateOneCategory,
} from '@/actions/bindings';
import FilenameItem from './FilenameItem.vue';

const props = defineProps<{
  entry: BindingModel;
}>();

const { mutate } = useMutation({
  mutationFn: ({
    bindingId,
    categoryId,
  }: {
    bindingId: string;
    categoryId: string;
  }) => updateOneCategory({ bindingId, categoryId }),
});

const { mutate: mutateRemove } = useMutation({
  mutationFn: ({ bindingId }: { bindingId: string }) =>
    removeCategoryFromBinding(bindingId),
});
const handleCategoryChange = (event: Event) => {
  const { value } = event.target as HTMLSelectElement;
  if (value === '0') {
    mutateRemove({ bindingId: props.entry.binding.id });
  } else {
    mutate({ bindingId: props.entry.binding.id, categoryId: value });
  }
};
</script>
<template>
  <div class="grid grid-flow-col auto-cols-fr gap-4">
    <FilenameItem :file-name="entry.audio.file_name" />
    <AudioItem :audio-data="entry.audio" class="col-span-3" />
    <TextItem
      :text-data="entry.text"
      class="col-span-3 p-2 border-2 border-primary-500"
    />
    <CategoryItem
      :category-data="entry.category"
      class="col-span-1 self-center p-2 rounded-md border-2 border-primary-500"
      :onchange="handleCategoryChange"
    />
  </div>
</template>
