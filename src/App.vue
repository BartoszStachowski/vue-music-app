<template>
  <Header />
  <router-view></router-view>
  <Auth v-if="modalStore.isOpen('authModal')" />
</template>

<script setup>
import { useUserHandler } from '@/composables/useUserHandler';
import Header from '@/components/Header.vue';

import { defineAsyncComponent } from 'vue';
import useModalStore from '@/stores/modal'
const Auth = defineAsyncComponent(() => import('@/components/auth/Auth.vue'));

const modalStore = useModalStore();

// get userData and set status
useUserHandler();
</script>
