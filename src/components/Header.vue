<template>
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <a class="mr-4 text-2xl font-bold text-white uppercase" href="#">Music</a>

      <div class="flex items-center flex-grow">
        <ul class="flex flex-row mt-1">
          <li v-if="!isUserLoggedIn">
            <a class="px-2 text-white" href="#" @click="openModal"> Login / Register </a>
          </li>
          <li v-if="isUserLoggedIn">
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
          <li v-if="isUserLoggedIn">
            <a class="px-2 text-white" href="#" @click="handleSignOut">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';
import { useSignOut } from '@nhost/vue';
const { signOut } = useSignOut();

const userStore = useUserStore();
const modalStore = useModalStore();
const { isUserLoggedIn } = storeToRefs(userStore);

const handleSignOut = async (e) => {
  e.preventDefault();
  await signOut();
};

const openModal = () => {
  modalStore.open('authModal');
};
</script>
