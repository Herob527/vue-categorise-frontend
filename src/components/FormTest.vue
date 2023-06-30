<script setup lang="ts">
import { ref } from 'vue';
const form = ref<HTMLFormElement | undefined>(undefined);

const submit = async () => {
  const formData = new FormData(form.value);
  const data = await fetch('http://localhost:8000/bindings', {
    method: 'POST',
    body: formData,
  });
  console.dir(data);
};
</script>

<template>
  <form @submit.prevent="submit" ref="form" class="flex flex-col">
    <label> Category name </label>
    <input text name="category" required />
    <label> Text content </label>
    <input text name="text" required />
    <label> File </label>
    <input type="file" name="audio" required />
    <button>get</button>
  </form>
</template>
