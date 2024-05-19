<script setup lang="ts">
import {
  faClipboard,
  faInfo,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
const props = defineProps<{ fileName: string; isEvenIndex: boolean }>();

const iconMapping = {
  mp3: faMusic,
  wav: faMusic,
  txt: faClipboard,
} as const;

const extension = props.fileName.split('.').pop() as keyof typeof iconMapping;

const usedIcon =
  extension && extension in iconMapping ? iconMapping[extension] : faInfo;
</script>
<template>
  <font-awesome-icon
    width="16"
    :icon="usedIcon"
    :class="`${isEvenIndex ? 'text-primary-700' : 'text-primary-500 '}`"
  />
</template>
