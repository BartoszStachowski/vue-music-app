import { defineStore } from 'pinia';

export default defineStore('modal', {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    hiddenClass: (state) => (!state.isOpen ? 'hidden' : ''),
  },
  actions: {
    close() {
      this.isOpen = false;
      document.body.classList.remove('body-lock');
    },
    open() {
      this.isOpen = true;
      document.body.classList.add('body-lock');
    },
  },
});
