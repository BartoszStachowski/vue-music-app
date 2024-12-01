<template>
  <div v-if="isOpenModal" class="fixed inset-0 z-10 overflow-y-auto" id="modal">
    <div
      class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

      <div
        class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
      >
        <div class="px-6 py-4 text-left">
          <div class="flex items-center justify-between pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <div class="modal-close z-50 cursor-pointer" @click="closeModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <ul class="mb-4 flex flex-wrap">
            <li class="flex-auto text-center">
              <a
                class="block rounded bg-blue-600 px-4 py-3 text-white transition hover:text-white"
                href="#"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a class="block rounded px-4 py-3 transition" href="#">Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <form>
            <div class="mb-3">
              <label class="mb-2 inline-block">Email</label>
              <input
                type="email"
                class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Enter Email"
              />
            </div>
            <div class="mb-3">
              <label class="mb-2 inline-block">Password</label>
              <input
                type="password"
                class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700"
            >
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <form>
            <div class="mb-3">
              <label class="mb-2 inline-block">Name</label>
              <input
                type="text"
                class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
            <div class="mb-3">
              <label class="mb-2 inline-block">Email</label>
              <input
                type="email"
                class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Enter Email"
              />
            </div>
            <div class="mb-3">
              <label class="mb-2 inline-block">Age</label>
              <input
                type="number"
                class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
              />
            </div>
            <div class="mb-3">
              <label class="mb-2 inline-block">Password</label>
              <input
                type="password"
                class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div class="mb-3">
              <label class="mb-2 inline-block">Confirm Password</label>
              <input
                type="password"
                class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>
            <div class="mb-3">
              <label class="mb-2 inline-block">Country</label>
              <select
                class="block w-full rounded border border-gray-300 px-3 py-1.5 text-gray-800 transition duration-500 focus:border-black focus:outline-none"
              >
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            <div class="mb-3 pl-6">
              <input type="checkbox" class="float-left -ml-6 mt-1 h-4 w-4 rounded" />
              <label class="inline-block">Accept terms of service</label>
            </div>
            <button
              type="submit"
              class="block w-full rounded bg-purple-600 px-3 py-1.5 text-white transition hover:bg-purple-700"
            >
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
import { computed, useRef } from 'vue';

export default {
  name: 'AppAuth',
  setup() {
    const tab = useRef('login');
    const modalStore = useModalStore();

    const isOpenModal = computed(() => modalStore.isOpen);

    const closeModal = modalStore.close;

    return {
      tab,
      isOpenModal,
      closeModal,
    };
  },
};
</script>
