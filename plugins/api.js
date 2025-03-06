// plugins/api.js
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      Accept: 'application/ld+json',
    },
    cache: 'no-cache',

    async onRequest({ options }) {
      const accessToken = useCookie('accessToken').value;
      if (accessToken) {
        const headers = options.headers || {};
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `Bearer ${accessToken}`]);
        } else if (headers instanceof Headers) {
          headers.set('Authorization', `Bearer ${accessToken}`);
        } else {
          headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    },

    async onRequestError({ request, options, error }) {
      // Handle request errors (e.g., network errors)
      console.error('API Request Error:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Request Error',
        message: `Failed to send request: ${error.message}`,
        fatal: true,
      });
    },

    async onResponseError({ request, response, options }) {
      // Handle different error status codes
      switch (response.status) {
        case 401:
          handle401({ request, response, options });
          break;
        case 422:
          throw createError({
            statusCode: response.status,
            statusMessage: response._data.message,
            message: response._data.message,
            data: response._data,
            fatal: true,
          });
        case 409:
          console.error('response');
          console.error(response._data);
          console.error(response._data.detail);
          throw createError({
            statusCode: response.status,
            statusMessage: response._data.message,
            message: response._data.detail,
            data: response._data,
            fatal: true,
          });
        default:
          // Handle other errors
          console.error('API Response Error:', response.status, response);
          throw createError({
            statusCode: response.status,
            statusMessage: response.statusText,
            message:
              'API Response Error: An error occurred while processing your request.',
            data: response._data,
            fatal: true,
          });
      }
    },
  });

  const handle401 = async ({ request, response, options }) => {
    // Token expired, try to refresh
    const refreshToken = useCookie('refreshToken').value;
    if (refreshToken) {
      try {
        const tokenRefreshResponse = await $fetch(
          config.public.apiBase + '/token/refresh',
          {
            method: 'POST',
            body: { refresh_token: refreshToken },
          },
        );
        authStore.setTokens(
          tokenRefreshResponse.token,
          tokenRefreshResponse.refresh_token,
        );
        // Retry the original request
        return await $fetch(request, {
          onRequest({ options }) {
            const newAccessToken = tokenRefreshResponse.token;
            const headers = options.headers || {};
            if (Array.isArray(headers)) {
              headers.push(['Authorization', `Bearer ${newAccessToken}`]);
            } else if (headers instanceof Headers) {
              headers.set('Authorization', `Bearer ${newAccessToken}`);
            } else {
              headers.Authorization = `Bearer ${newAccessToken}`;
            }
          },
        });
      } catch (error) {
        // Refresh failed, redirect to login
        console.error(error);
        authStore.clearAuth();
        navigateTo('/admin/login');
      }
    } else {
      // No refresh token, redirect to login
      authStore.clearAuth();
      navigateTo('/admin/login');
    }
  };

  return {
    provide: {
      api,
    },
  };
});
