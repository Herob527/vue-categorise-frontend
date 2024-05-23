<script setup lang="ts" generic="T">
const props = defineProps<{
  data: T[];
  className?: string;
  title?: string;
  itemKeys?: string[] | readonly string[];
}>();
</script>
<template>
  <div
    v-if="props.data.length === 0"
    class="flex overflow-hidden flex-col rounded-xl border-2 border-primary-500"
  >
    <p class="p-2 text-2xl font-bold text-white uppercase bg-primary-600">
      {{ props.title }}
    </p>
    <div
      class="flex flex-row items-center py-2 text-xl font-bold text-center text-white uppercase bg-primary-500"
    >
      <span class="flex-1" v-for="item in itemKeys" :key="item">{{
        item
      }}</span>
    </div>
    <slot name="fallback" v-if="props.data.length === 0" />
  </div>

  <DynamicScroller
    :items="data"
    :min-item-size="75"
    vue-else
    :class="`${className} overflow-y-auto max-h-96`"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :data-index="index"
        :active="active"
        v-if="typeof index === 'number'"
      >
        <div v-if="index === 0" class="flex flex-col">
          <p class="p-2 text-2xl font-bold text-white uppercase bg-primary-600">
            {{ props.title }}
          </p>
          <div
            class="flex flex-row items-center py-2 text-xl font-bold text-center text-white uppercase bg-primary-500"
          >
            <span class="flex-1" v-for="item in itemKeys" :key="item">{{
              item
            }}</span>
          </div>
        </div>
        <slot name="item" :key="item.id" :index="index" :entry="item" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
