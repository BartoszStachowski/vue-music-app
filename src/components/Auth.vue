<template>
  <div v-if="isOpenModal" class="fixed inset-0 z-10 overflow-y-auto" id="modal">
    <div
      class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

      <div
        class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
      >
        <div class="px-6 py-4 text-left">
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <div class="modal-close z-50 cursor-pointer" @click="closeModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <ul class="mb-4 flex flex-wrap">
            <li class="flex-auto text-center">
              <a
                class="block rounded px-4 py-3 transition"
                href="#"
                :class="{
                  'bg-blue-600 text-white hover:text-white': tab === 'login',
                  'hover:text-blue-600': tab === 'register',
                }"
                @click.prevent="tab = 'login'"
              >
                Login
              </a>
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded px-4 py-3 transition"
                href="#"
                :class="{
                  'bg-blue-600 text-white hover:text-white': tab === 'register',
                  'hover:text-blue-600': tab === 'login',
                }"
                @click.prevent="tab = 'register'"
              >
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
              <AppInput
                v-model="loginPassword"
                label="Password"
                type="password"
                placeholder="Password"
                autocomplete="current-password"
              />
            </div>
            <div v-if="loginErrorMessage" class="mb-3 text-center text-red-500">
              {{ loginErrorMessage }}
            </div>
            <button
              type="submit"
              class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700"
            >
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <form v-show="tab === 'register'" @submit.prevent="handleRegister">
            <div class="mb-3">
              <AppInput v-model="registerName" label="Name" placeholder="Enter Name" />
            </div>
            <div class="mb-3">
              <AppInput
                v-model="registerEmail"
                label="Email"
                type="email"
                placeholder="Enter Email"
              />
            </div>
            <div class="mb-3">
              <AppInput v-model="registerAge" label="Age" type="number" />
            </div>
            <div class="mb-3">
              <AppInput
                v-model="registerPassword"
                label="Password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div class="mb-3">
              <AppInput
                v-model="registerConfirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div class="mb-3">
              <AppSelect v-model="registerCountry" label="Country" :options="countriesOptions" />
            </div>
            <div class="mb-3 pl-6">
              <AppInput
                v-model="registerTermsAccept"
                type="checkbox"
                label="Accept terms of service"
              />
            </div>
            <button
              type="submit"
              class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useModalStore from '@/stores/modal';
import AppInput from '@/components/AppInput.vue';
import AppSelect from '@/components/AppSelect.vue';
import { computed, ref } from 'vue';
import { validateEmail, validatePassword } from '@/utils/validators';

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

const modalStore = useModalStore();

const isOpenModal = computed(() => modalStore.isOpen);

const closeModal = modalStore.close;
const countriesOptions = ['USA', 'Mexico', 'Germany'];

const handleLogin = () => {
  loginErrorMessage.value = '';

  if (validateEmail(loginEmail.value)) {
    return (loginErrorMessage.value = validateEmail(loginEmail.value));
  }

  if (validatePassword(loginPassword.value)) {
    return (loginErrorMessage.value = validatePassword(loginPassword.value));
  }

  const obj = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  // TODO: connect with nhost
  console.log(obj);
};

const handleRegister = () => {
  const obj = {
    name: registerName.value,
    email: registerEmail.value,
    age: registerAge.value,
    password: registerPassword.value,
    country: registerCountry.value,
  };

  console.log(obj);
};
</script>
