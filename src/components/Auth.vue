<template>
  <div v-if="isOpenModal" class="fixed inset-0 z-10 overflow-y-auto" id="modal">
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

      <div
        class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        <div class="px-6 py-4 text-left">
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <div class="z-50 cursor-pointer modal-close" @click="closeModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

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
          <form v-show="tab === 'login'">
            <div class="mb-3">
              <AppInput v-model="email" type="email" label="Email" placeholder="Enter Email" />
            </div>
            <div class="mb-3">
              <AppInput v-model="password" label="Password" type="password" placeholder="Password"
                autocomplete="current-password" />
            </div>
            <button type="submit"
              class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700">
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <form v-show="tab === 'register'">
            <div class="mb-3">
              <AppInput label="Name" placeholder="Enter Name" />
            </div>
            <div class="mb-3">
              <AppInput label="Email" type="email" placeholder="Enter Email" />
            </div>
            <div class="mb-3">
              <AppInput label="Age" type="number" />
            </div>
            <div class="mb-3">
              <AppInput label="Password" type="password" placeholder="Password" />
            </div>
            <div class="mb-3">
              <AppInput label="Confirm Password" type="password" placeholder="Confirm Password" />
            </div>
            <div class="mb-3">
              <AppSelect label="Country" :options="countriesOptions" />
            </div>
            <div class="pl-6 mb-3">
              <AppInput type="checkbox" label="Accept terms of service" />
            </div>
            <button type="submit"
              class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useModalStore from '@/stores/modal';
import AppInput from '@/components/AppInput.vue';
import AppSelect from '@/components/AppSelect.vue';
import { computed, ref } from 'vue';

export default {
  name: 'AppAuth',
  components: {
    AppInput,
    AppSelect,
  },
  setup() {
    const tab = ref('login');
    const email = ref('');
    const password = ref('')
    const modalStore = useModalStore();

    const isOpenModal = computed(() => modalStore.isOpen);

    const closeModal = modalStore.close;
    const countriesOptions = ['USA', 'Mexico', 'Germany'];

    return {
      tab,
      email,
      password,
      countriesOptions,
      isOpenModal,
      closeModal,
    };
  },
};
</script>
