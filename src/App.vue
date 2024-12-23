<template>
  <AppHeader />
  <router-view></router-view>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';

import { useAuthenticated, useUserData } from '@nhost/vue';
import useUserStore from '@/stores/user';

const isAuthenticated = useAuthenticated();
console.log('isAuthenticated', isAuthenticated);
</script>
