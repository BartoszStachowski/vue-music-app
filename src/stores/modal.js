import { defineStore } from 'pinia';

export default defineStore('modal', {
  state: () => ({
    modals: {},
  }),
  getters: {
    isOpen: (state) => (modalName) => !!state.modals[modalName],
  },
  actions: {
    open(modalName) {
      this.modals[modalName] = true;
    },
    close(modalName) {
      this.modals[modalName] = false;
    }
  },
});
