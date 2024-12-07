<template>
  <AppHeader />
  <router-view></router-view>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

import AppHeader from '@/components/AppHeader.vue';

const Auth = defineAsyncComponent(() => import('@/components/Auth.vue'));
</script>
