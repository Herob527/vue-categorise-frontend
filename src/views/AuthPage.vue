<script setup lang="ts">
import LoginForm from '@/components/Auth/LoginForm.vue';
import RegisterForm from '@/components/Auth/RegisterForm.vue';
import { ref } from 'vue';

const enum LoginProcess {
  REGISTER,
  LOGIN,
}
const status = ref(LoginProcess.LOGIN);
</script>
<template>
  <div
    v-if="status === LoginProcess.LOGIN"
    class="bg-primary-500 inline-flex p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl">
    <LoginForm @register="status = LoginProcess.REGISTER" />
  </div>
  <div
    v-else-if="status === LoginProcess.REGISTER"
    class="bg-primary-500 inline-flex p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl">
    <RegisterForm @login="status = LoginProcess.LOGIN" />
  </div>
  <div v-else>This wasn't supposed to happen. Refresh the page</div>
</template>
