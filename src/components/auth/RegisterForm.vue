<template>
  <form @submit.prevent="handleRegister">
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
      class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700"
    >
      Submit
    </button>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import AppInput from '@/components/AppInput.vue';
import AppSelect from '@/components/AppSelect.vue';
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateCompareValues,
} from '@/utils/validators';

import { useSignUpEmailPassword } from '@nhost/vue';

const countriesOptions = ['USA', 'Mexico', 'Germany'];
const name = ref('');
const email = ref('');
const age = ref(null);
const password = ref('');
const confirmPassword = ref('');
const country = ref('');
const termAccept = ref(null);
const errorMsg = ref('');

const { signUpEmailPassword } = useSignUpEmailPassword();

const handleRegister = async () => {
  errorMsg.value = '';

  const obj = {
    name: name.value,
    email: email.value,
    age: age.value,
    password: password.value,
    country: country.value,
    termsAccept: termAccept.value,
  };

  if (validateRequired(obj.name, 'Name')) {
    return (errorMsg.value = validateRequired(obj.name, 'Name'));
  }

  if (validateEmail(obj.email)) {
    return (errorMsg.value = validateEmail(obj.email));
  }

  if (validatePassword(obj.password)) {
    return (errorMsg.value = validatePassword(obj.password));
  }

  if (validateCompareValues(obj.password, confirmPassword.value)) {
    return (errorMsg.value = validateCompareValues(
      obj.password,
      confirmPassword.value,
      'Confirm password',
    ));
  }

  if (validateRequired(obj.termsAccept)) {
    return (errorMsg.value = validateRequired(obj.termsAccept, 'Terms'));
  }

  try {
    const response = await signUpEmailPassword(obj.email, obj.password, {
      metadata: {
        name: obj.name,
        age: obj.age || null,
        country: obj.country || null,
        termsAccept: obj.termsAccept,
      },
    });

    if (response.error.status === 0) {
      throw new Error('An unexpected error occured. Please try again leater.');
    }

    if (response.error) {
      throw new Error(response.error.message);
    }
  } catch (error) {
    errorMsg.value = error.message;
    console.error(error);
  }

  console.log(obj);
};
</script>
