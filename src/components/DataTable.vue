<script setup lang="ts" generic="T">
const props = defineProps<{ data: T[]; className?: string }>();
</script>
<template>
  <slot name="fallback" v-if="props.data.length === 0" />
  <DynamicScroller
    :items="data"
    :min-item-size="75"
    vue-else
    :class="className"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :data-index="index"
        :active="active"
        v-if="typeof index === 'number'"
      >
        <slot name="item" :key="item.id" :index="index" :entry="item" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
