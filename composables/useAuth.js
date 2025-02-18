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
      authStore.setUsername(response.username);
      return true;
    } catch (error) {
      alert(error);
      // Handle errors
      throw error;
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
