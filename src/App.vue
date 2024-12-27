<template>
  <AppHeader />
  <router-view></router-view>
</template>

<script setup>
import { useUserHandler } from '@/composables/useUserHandler';
import AppHeader from '@/components/AppHeader.vue';

// get userData and set status
useUserHandler();
</script>
