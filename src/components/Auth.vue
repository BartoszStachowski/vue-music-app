<template>
  <AppModal @close="closeModal">
    <ul class="flex flex-wrap mb-4">
      <li class="flex-auto text-center">
        <a class="block px-4 py-3 transition rounded" href="#" :class="{
          'bg-blue-600 text-white hover:text-white': tab === 'login',
          'hover:text-blue-600': tab === 'register',
        }" @click.prevent="tab = 'login'">
          Login
        </a>
      </li>
      <li class="flex-auto text-center">
        <a class="block px-4 py-3 transition rounded" href="#" :class="{
          'bg-blue-600 text-white hover:text-white': tab === 'register',
          'hover:text-blue-600': tab === 'login',
        }" @click.prevent="tab = 'register'">
          Register
        </a>
      </li>
    </ul>

    <!-- Login Form -->
    <form v-show="tab === 'login'" @submit.prevent="handleLogin">
      <div class="mb-3">
        <AppInput v-model="loginEmail" type="text" label="Email" placeholder="Enter Email" />
      </div>
      <div class="mb-3">
        <AppInput v-model="loginPassword" label="Password" type="password" placeholder="Password"
          autocomplete="current-password" />
      </div>
      <div v-if="loginErrorMessage" class="mb-3 text-center text-red-500">
        {{ loginErrorMessage }}
      </div>
      <button type="submit"
        class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700">
        Submit
      </button>
    </form>
    <!-- Registration Form -->
    <form v-show="tab === 'register'" @submit.prevent="handleRegister">
      <div class="mb-3">
        <AppInput v-model="registerName" label="Name<span class='text-red-500'>*</span>" placeholder="Enter Name" />
      </div>
      <div class="mb-3">
        <AppInput v-model="registerEmail" label="Email<span class='text-red-500'>*</span>" type="email"
          placeholder="Enter Email" />
      </div>
      <div class="mb-3">
        <AppInput v-model="registerAge" label="Age" type="number" />
      </div>
      <div class="mb-3">
        <AppInput v-model="registerPassword" label="Password<span class='text-red-500'>*</span>" type="password"
          placeholder="Password" />
      </div>
      <div class="mb-3">
        <AppInput v-model="registerConfirmPassword" label="Confirm Password<span class='text-red-500'>*</span>"
          type="password" placeholder="Confirm Password" />
      </div>
      <div class="mb-3">
        <AppSelect v-model="registerCountry" label="Country" :options="countriesOptions" />
      </div>
      <div class="pl-6 mb-3">
        <AppInput v-model="registerTermsAccept" type="checkbox" label="Accept terms of service" />
      </div>
      <div v-if="registerErrorMessage" class="mb-3 text-center text-red-500">
        {{ registerErrorMessage }}
      </div>
      <button type="submit"
        class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700">
        Submit
      </button>
    </form>
  </AppModal>
</template>
<script setup>
import useModalStore from '@/stores/modal';
import AppInput from '@/components/AppInput.vue';
import AppSelect from '@/components/AppSelect.vue';
import AppModal from '@/components/AppModal.vue';
import { ref, onUnmounted } from 'vue';
import { validateEmail, validatePassword, validateRequired, validateCompareValues } from '@/utils/validators';
import { useSignUpEmailPassword } from '@nhost/vue';

// store
const modalStore = useModalStore();

const tab = ref('login');
// login
const loginEmail = ref('');
const loginPassword = ref('');
const loginErrorMessage = ref('');
// register
const registerName = ref('');
const registerEmail = ref('');
const registerAge = ref(null);
const registerPassword = ref('');
const registerConfirmPassword = ref('');
const registerCountry = ref('');
const registerTermsAccept = ref(null);
const registerErrorMessage = ref('')

const { signUpEmailPassword } = useSignUpEmailPassword();



const closeModal = () => {
  modalStore.close('authModal');
}

const countriesOptions = ['USA', 'Mexico', 'Germany'];

const handleLogin = () => {
  loginErrorMessage.value = '';

  const obj = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  if (validateEmail(obj.email)) {
    return (loginErrorMessage.value = validateEmail(obj.email));
  }

  if (validatePassword(obj.password)) {
    return (loginErrorMessage.value = validatePassword(obj.password));
  }
  // TODO: connect with nhost
  console.log(obj);
};

const handleRegister = async () => {
  registerErrorMessage.value = ''

  const obj = {
    name: registerName.value,
    email: registerEmail.value,
    age: registerAge.value,
    password: registerPassword.value,
    country: registerCountry.value,
    termsAccept: registerTermsAccept.value,
  };

  if (validateRequired(obj.name, 'Name')) {
    return registerErrorMessage.value = validateRequired(obj.name, 'Name')
  }

  if (validateEmail(obj.email)) {
    return (registerErrorMessage.value = validateEmail(obj.email));
  }

  if (validatePassword(obj.password)) {
    return (registerErrorMessage.value = validatePassword(obj.password))
  }

  if (validateCompareValues(obj.password, registerConfirmPassword.value)) {
    return registerErrorMessage.value = validateCompareValues(obj.password, registerConfirmPassword.value, 'Confirm password')
  }

  if (validateRequired(obj.termsAccept)) {
    return registerErrorMessage.value = validateRequired(obj.termsAccept, 'Terms')
  }

  try {
    const response = await signUpEmailPassword(obj.email, obj.password, {
      metadata: {
        name: obj.name,
        age: obj.age || null,
        country: obj.country || null,
        termsAccept: obj.termsAccept,
      }
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

  } catch (error) {
    registerErrorMessage.value = error.message
    console.error(error)
  }

  console.log(obj);
};

onUnmounted(() => {
  loginEmail.value = '';
  loginPassword.value = '';
  loginErrorMessage.value = '';
  registerName.value = '';
  registerEmail.value = '';
  registerAge.value = null;
  registerPassword.value = '';
  registerConfirmPassword.value = '';
  registerCountry.value = '';
  registerTermsAccept.value = null;
});
</script>
