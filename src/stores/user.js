import { defineStore } from 'pinia';
import { useSignUpEmailPassword } from '@nhost/vue';

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
});
