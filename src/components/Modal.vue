<template>
  <div id="modal" class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>
      <div
        class="inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
      >
        <div class="px-6 py-4 text-left">
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <div class="modal-close z-50 cursor-pointer" @click="close">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);
const close = () => {
  emit('close');
};
</script>
