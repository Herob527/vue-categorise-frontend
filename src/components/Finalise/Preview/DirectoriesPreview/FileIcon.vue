<script setup lang="ts">
import {
  faClipboard,
  faInfo,
  faMusic,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
const props = defineProps<{ fileName: string; isEvenIndex: boolean }>();

const icon = () => {
  const iconMapping = {
    mp3: faMusic,
    wav: faMusic,
    txt: faClipboard,
  } as const;

  type FileExtension = keyof typeof iconMapping;

  return {
    get(extension: string | undefined): IconDefinition {
      if (extension && extension in iconMapping) {
        return iconMapping[extension as FileExtension];
      }
      return faInfo;
    },
  };
};

const usedIcon = icon().get(props.fileName.split('.').pop());
</script>
<template>
  <font-awesome-icon
    width="16"
    :icon="usedIcon"
    :class="`${isEvenIndex ? 'text-primary-700' : 'text-primary-500 '}`" />
</template>
