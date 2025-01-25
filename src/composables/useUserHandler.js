import { watch } from 'vue';
import { useUserData } from '@nhost/vue';
import useUserStore from '@/stores/user';

export function useUserHandler() {
  const userData = useUserData();
  const userStore = useUserStore();

  const updateUserInStore = (data) => {
    if (data) {
      userStore.setUserData(data);
      userStore.setLoggedInStatus(true);
    } else {
      userStore.clearUserData();
    }
  };

  watch(userData, updateUserInStore, { immediate: true });

  return {
    updateUserInStore,
  };
}
