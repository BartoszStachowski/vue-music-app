<template>
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <a class="mr-4 text-2xl font-bold text-white uppercase" href="#">Music</a>

      <div class="flex items-center flex-grow">
        <ul class="flex flex-row mt-1">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="modalClose">
              Login / Register
            </a>
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import useModalStore from '@/stores/modal';
export default {
  name: 'AppHeader',

  setup() {
    const modalStore = useModalStore();
    const modalClose = modalStore.open;

    return {
      modalClose,
    };
  },
};
</script>
