<template>
  <form @submit.prevent="handleRegister">
    <h1 v-if="isSuccess" class="mb-3 bg-green-700 py-3 text-center font-medium text-white">
      Success! Your account has been created.
    </h1>
    <div class="mb-3">
      <AppInput
        v-model="name"
        label="Name<span class='text-red-500'>*</span>"
        placeholder="Enter Name"
      />
    </div>
    <div class="mb-3">
      <AppInput
        v-model="email"
        label="Email<span class='text-red-500'>*</span>"
        type="email"
        placeholder="Enter Email"
        autocomplete="username"
      />
    </div>
    <div class="mb-3">
      <AppInput v-model="age" label="Age" type="number" />
    </div>
    <div class="mb-3">
      <AppInput
        v-model="password"
        label="Password<span class='text-red-500'>*</span>"
        type="password"
        placeholder="Password"
        autocomplete="new-password"
      />
    </div>
    <div class="mb-3">
      <AppInput
        v-model="confirmPassword"
        label="Confirm Password<span class='text-red-500'>*</span>"
        type="password"
        placeholder="Confirm Password"
        autocomplete="new-password"
      />
    </div>
    <div class="mb-3">
      <AppSelect v-model="country" label="Country" :options="countriesOptions" />
    </div>
    <div class="mb-3 pl-6">
      <AppInput v-model="termAccept" type="checkbox" label="Accept terms of service" />
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
import { ref, watchEffect } from 'vue';
import AppInput from '@/components/AppInput.vue';
import AppSelect from '@/components/AppSelect.vue';
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateCompareValues,
} from '@/utils/validators';

import { useSignUpEmailPassword } from '@nhost/vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['authSuccess']);

const countriesOptions = ['USA', 'Mexico', 'Germany'];
const name = ref('');
const email = ref('');
const age = ref(null);
const password = ref('');
const confirmPassword = ref('');
const country = ref('');
const termAccept = ref(null);
const errorMsg = ref('');

const { signUpEmailPassword, isLoading, isSuccess, error } = useSignUpEmailPassword();

watchEffect(() => {
  if (error.value) {
    errorMsg.value = error.value.message;
  }
  if (isSuccess.value) {
    emit('authSuccess');
  }
});

const handleRegister = async () => {
  errorMsg.value = '';

  if (validateRequired(name.value, 'Name')) {
    return (errorMsg.value = validateRequired(name.value, 'Name'));
  }

  if (validateEmail(email.value)) {
    return (errorMsg.value = validateEmail(email.value));
  }

  if (validatePassword(password.value)) {
    return (errorMsg.value = validatePassword(password.value));
  }

  if (validateCompareValues(password.value, confirmPassword.value)) {
    return (errorMsg.value = validateCompareValues(
      password.value,
      confirmPassword.value,
      'Confirm password',
    ));
  }

  if (validateRequired(termAccept.value)) {
    return (errorMsg.value = validateRequired(termAccept.value, 'Terms'));
  }

  try {
    await signUpEmailPassword(email.value, password.value, {
      metadata: {
        name: name.value,
        age: age.value || null,
        country: country.value || null,
        termAccept: termAccept.value,
      },
    });
  } catch (error) {
    console.error(error);
    return;
  }
};
</script>
