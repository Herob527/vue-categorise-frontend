<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import AudioItem from './AudioItem.vue';
import CategoryItem from './CategoryItem.vue';
import TextItem from './TextItem.vue';
import { type BindingModel } from '@/types/generated';
import { updateOneCategory } from '@/actions/bindings';

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

const handleCategoryChange = (event: Event) => {
  const { value } = event.target as HTMLSelectElement;
  mutate({ bindingId: props.entry.binding.id, categoryId: value });
};
</script>
<template>
  <div class="grid grid-cols-8 gap-4">
    <span class="col-span-1 self-center">{{ entry.audio.file_name }}</span>
    <AudioItem :audioData="entry.audio" class="col-span-3" />
    <TextItem
      :textData="entry.text"
      class="col-span-3 p-2 border-2 border-primary-500"
    />
    <CategoryItem
      :categoryData="entry.category"
      class="col-span-1 self-center p-2 rounded-md border-2 border-primary-500"
      :onchange="handleCategoryChange"
    />
  </div>
</template>
