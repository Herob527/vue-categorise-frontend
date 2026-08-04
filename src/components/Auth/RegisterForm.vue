<script setup lang="ts">
interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const emit = defineEmits({
  login: () => true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: (payload: RegisterData) => true,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSubmit = (loginData: RegisterData) => {
  emit('register', loginData);
};
</script>
<template>
  <section
    class="inline-flex flex-col gap-2 p-2 text-white border-2 border-white rounded-2xl">
    <h2 class="text-2xl font-bold">Register</h2>
    <div>
      <p>Username</p>
      <input
        type="text"
        class="bg-white text-black px-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-500" />
    </div>
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
    <div>
      <p>Repeat password</p>
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
        @click="emit('login')">
        Login
      </button>
    </div>
  </section>
</template>
