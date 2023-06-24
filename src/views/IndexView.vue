<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)

const increment = () => {
  count.value++
}
</script>
<template>
  <button @click="increment">{{ count }}</button>
</template>
