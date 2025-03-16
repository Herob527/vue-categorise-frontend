<script setup lang="ts">
import { type TextModel } from '@/types/generated';
import { updateOne } from '@/actions/texts';
import { useMutation } from '@tanstack/vue-query';
import { debounce } from '@/utils/debounceWrapper';

const { textData } = defineProps<{ textData: TextModel; className?: string }>();

const { mutate } = useMutation({
  mutationFn: async (newText: string) => {
    updateOne({ id: textData.id, text: newText });
  },
});

const [debounceMutation] = debounce((newText: string) => {
  mutate(newText);
}, 500);

const handleInput = (event: Event) => {
  const newText = (event.currentTarget as HTMLTextAreaElement).value;
  debounceMutation(newText);
};
</script>

<template>
  <textarea
    :value="textData.text"
    :class="className"
    @input="handleInput">
  </textarea>
</template>
