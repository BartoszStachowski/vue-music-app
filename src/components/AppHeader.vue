<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex items-center justify-start px-4 py-5">
      <a class="mr-4 text-2xl font-bold uppercase text-white" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <ul class="mt-1 flex flex-row">
          <li v-if="!isUserLoggedIn">
            <a class="px-2 text-white" href="#" @click="openModal"> Login / Register </a>
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
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

const userStore = useUserStore();
const modalStore = useModalStore();
const { isUserLoggedIn } = storeToRefs(userStore);

const openModal = () => {
  modalStore.open('authModal');
};
</script>
