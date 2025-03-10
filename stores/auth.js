import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('accessToken', { sameSite: 'lax', secure: true }),
    tokenRefresh: useCookie('refreshToken', { sameSite: 'lax', secure: true }),
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.token;
    },
  },

  actions: {
    setTokens(accessToken, refreshToken) {
      this.token = accessToken;
      refreshCookie('accessToken');
      this.tokenRefresh = refreshToken;
      refreshCookie('refreshToken');
    },

    clearAuth() {
      this.username = '';
      this.token = null;
      refreshCookie('accessToken');
      useCookie('refreshToken', { sameSite: 'lax' }).value = null;
      refreshCookie('refreshToken');
    },

    async login(credentials) {
      const { $api } = useNuxtApp();
      try {
        const response = await $api('/login', {
          method: 'POST',
          body: credentials,
        });
        if (response) {
          this.setTokens(response.token, response.refresh_token);
          this.username = credentials.username;
          navigateTo('/admin');
        }
      } catch (error) {
        alert('Wrong Credentials', error);
      }
    },

    logout() {
      this.clearAuth();
      navigateTo('/admin/login');
    },
  },
});
