<template>
  <form @submit.prevent="handleRegister">
    <h1 v-if="statusSuccess" class="mb-3 bg-green-700 py-3 text-center font-medium text-white">
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
      class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700"
    >
      Submit
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

const countriesOptions = ['USA', 'Mexico', 'Germany'];
const name = ref('');
const email = ref('');
const age = ref(null);
const password = ref('');
const confirmPassword = ref('');
const country = ref('');
const termAccept = ref(null);
const errorMsg = ref('');
const statusSuccess = ref(false);

// const { signUpEmailPassword, isSuccess } = useSignUpEmailPassword();
const { signUpEmailPassword, needsEmailVerification, isLoading, isSuccess, isError, error } =
  useSignUpEmailPassword();

watchEffect(() => {
  console.log('State changes:', {
    needsEmailVerification: needsEmailVerification.value,
    isLoading: isLoading.value,
    isSuccess: isSuccess.value,
    isError: isError.value,
    error: error.value,
  });
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

    // if (response.error?.status === 0) {
    //   throw new Error('An unexpected error occured. Please try again leater.');
    // }

    // if (response.error) {
    //   throw new Error(response.error.message);
    // }
  } catch (error) {
    errorMsg.value = error.message;
    console.error(error);
    return;
  }
};
</script>

<!-- <template>
  <form @submit.prevent="handleFormSubmit">
    <div>
      <label for="email">Email:</label>
      <input v-model="email" id="email" type="email" placeholder="Enter your email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input
        v-model="password"
        id="password"
        type="password"
        placeholder="Enter your password"
        required
      />
    </div>
    <button type="submit" :disabled="isLoading">Sign Up</button>

    <p v-if="isError" class="error">Error: {{ errorMessage }}</p>
    <p v-if="isSuccess" class="success">
      Registration successful! Please check your email to verify your account.
    </p>
    <p v-if="needsEmailVerification" class="info">
      Registration successful, but you need to verify your email. Check your inbox.
    </p>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useSignUpEmailPassword } from '@nhost/vue';

// Reaktywne zmienne
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Wyciągnięcie funkcji i zmiennych stanu z `useSignUpEmailPassword`
const { signUpEmailPassword, needsEmailVerification, isLoading, isSuccess, isError, error } =
  useSignUpEmailPassword();

// // Obserwowanie zmian w `isError` i `error`
// watch(isError, (newValue) => {
//   if (newValue) {
//     errorMessage.value = error.value?.message || 'Something went wrong. Please try again later.';
//     console.error('Error occurred:', error.value);
//   } else {
//     errorMessage.value = '';
//   }
// });

// Obserwowanie zmian w `isSuccess`
watchEffect(() => {
  console.log(
    needsEmailVerification.value,
    isLoading.value,
    isSuccess.value,
    isError.value,
    error.value,
  );
});

// Funkcja obsługująca wysyłanie formularza
const handleFormSubmit = async () => {
  errorMessage.value = ''; // Reset komunikatu błędu
  console.log('Submitting registration...');
  await signUpEmailPassword(email.value, password.value);
  console.log('Registration request completed.');
};
</script>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}

.info {
  color: blue;
}
</style> -->
