<template>
  <form @submit.prevent="handleLogin">
    <div class="mb-3">
      <Input
        v-model="email"
        type="email"
        label="Email"
        placeholder="Enter Email"
        autocomplete="username"
      />
    </div>
    <div class="mb-3">
      <Input
        v-model="password"
        label="Password"
        type="password"
        placeholder="Password"
        autocomplete="current-password"
      />
    </div>
    <div v-if="errorMsg" class="mb-3 text-center text-red-500">
      {{ errorMsg }}
    </div>
    <button
      type="submit"
      class="flex h-10 w-full items-center justify-center rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700"
      :disabled="isLoading"
    >
      <Loader v-if="isLoading" />
      <span v-else>Submit</span>
    </button>
  </form>
</template>
<script setup>
import { ref, watchEffect, onUnmounted, defineEmits } from 'vue';
import Input from '@/components/Input.vue';
import Loader from '@/components/Loader.vue';
import { validateEmail, validatePassword } from '@/utils/validators';
import { useSignInEmailPassword } from '@nhost/vue';

const emit = defineEmits(['authSuccess']);

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const { signInEmailPassword, isLoading, isSuccess, error } = useSignInEmailPassword();

watchEffect(() => {
  if (isSuccess.value) {
    emit('authSuccess');
  }
  if (error.value) {
    errorMsg.value = error.value.message;
  }
});

const handleLogin = async () => {
  errorMsg.value = '';

  if (validateEmail(email.value)) {
    return (errorMsg.value = validateEmail(email.value));
  }

  if (validatePassword(password.value)) {
    return (errorMsg.value = validatePassword(password.value));
  }

  try {
    await signInEmailPassword(email.value, password.value);
  } catch (error) {
    console.error(error);
  }
};

onUnmounted(() => {
  errorMsg.value = '';
});
</script>
