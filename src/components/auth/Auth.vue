<template>
  <Modal @close="closeModal">
    <ul class="flex flex-wrap mb-4">
      <li class="flex-auto text-center">
        <a
          class="block px-4 py-3 transition rounded"
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
          class="block px-4 py-3 transition rounded"
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
    <LoginForm v-show="tab === 'login'" @authSuccess="closeModal" />

    <!-- Registration Form -->
    <RegisterForm v-show="tab === 'register'" @authSuccess="closeModal" />
  </Modal>
</template>
<script setup>
import useModalStore from '@/stores/modal';
import Modal from '@/components/Modal.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import { ref } from 'vue';

// store
const modalStore = useModalStore();

const tab = ref('login');

const closeModal = () => {
  modalStore.close('authModal');
};
</script>
