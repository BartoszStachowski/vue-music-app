<template>
  <Header />
  <router-view></router-view>
</template>

<script setup>
import { useUserHandler } from '@/composables/useUserHandler';
import Header from '@/components/Header.vue';

// get userData and set status
useUserHandler();
</script>
