import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    userData: null,
  }),
  getters: {
    isUserLoggedIn: (state) => state.userLoggedIn,
  },
  actions: {
    setUserData(data) {
      this.userData = data;
    },
    clearUserData() {
      this.userData = null;
    },
    setLoggedInStatus(status) {
      this.userLoggedIn = status;
    },
  },
});
