// composables/useAuth.js
import { useAuthStore } from '~/stores/auth';

export const useAuth = () => {
  const authStore = useAuthStore();
  const { $api } = useNuxtApp();

  const login = async (credentials) => {
    authStore.clearAuth();
    try {
      const response = await $api('/login', {
        method: 'POST',
        body: credentials,
      });
      authStore.setTokens(response.token, response.refresh_token);
      authStore.setUser(response.user); // a faire !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    authStore.clearAuth();
    navigateTo('/admin/login');
  };

  const refreshUser = async () => {
    try {
      const id = authStore.user.id;
      const user = await $api(`/users/${id}`);
      authStore.setUser(user);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return {
    login,
    logout,
    refreshUser,
  };
};
