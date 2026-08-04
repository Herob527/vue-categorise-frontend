<script setup lang="ts">
interface LoginData {
  email: string;
  password: string;
}

const emit = defineEmits({
  register: () => true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (payload: LoginData) => true,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSubmit = (loginData: LoginData) => {
  emit('login', loginData);
};
</script>
<template>
  <section
    class="inline-flex flex-col gap-2 p-2 text-white border-2 border-white rounded-2xl">
    <h2 class="text-2xl font-bold">Log in</h2>
    <div>
      <p>E-mail</p>
      <input
        type="email"
        class="bg-white text-black px-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-500" />
    </div>
    <div>
      <p>Password</p>
      <input
        type="text"
        class="bg-white text-black px-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-500" />
    </div>
    <div class="flex flex-row gap-2">
      <button
        class="bg-primary-600 text-white px-4 py-2 w-full relative rounded-md hover:bg-primary-700">
        Proceed
      </button>
      <button
        class="bg-primary-600 text-white px-4 py-2 w-full relative rounded-md hover:bg-primary-700"
        @click="emit('register')">
        Register
      </button>
    </div>
  </section>
</template>
