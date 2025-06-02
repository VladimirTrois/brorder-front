// plugins/api.js

// creation de V2 pour utiliser fetch et non $fetch qui ne récupère pas toutes les données

import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const apiV2 = async (url, options = {}) => {
    const accessToken = useCookie('accessToken').value;
    const headers = {
      Accept: 'application/ld+json',
      ...options.headers, // Merge custom headers if provided
    };

    // Attach the Authorization header if the access token is available
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const requestOptions = {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined, // Handle request body
    };

    try {
      // Make the fetch request
      const response = await fetch(config.public.apiBase + url, requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        handleApiError(response, errorData);
      }

      // Parse and return the response as JSON
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('API Request Error:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Request Error',
        message: `Failed to send request: ${error.message}`,
        fatal: true,
      });
    }
  };

  // Error handler based on response status codes
  const handleApiError = (response, errorData) => {
    switch (response.status) {
      case 401:
        handle401();
        break;
      case 422:
      case 409:
        throw createError({
          statusCode: response.status,
          statusMessage: errorData.message || errorData.detail,
          message: errorData.message || errorData.detail,
          data: errorData,
          fatal: true,
        });
      default:
        console.error('API Response Error:', response.status, response);
        throw createError({
          statusCode: response.status,
          statusMessage: response.statusText,
          message:
            'API Response Error: An error occurred while processing your request.',
          data: errorData,
          fatal: true,
        });
    }
  };

  // Handle 401 (Unauthorized) error by attempting to refresh the token
  const handle401 = async () => {
    const refreshToken = useCookie('refreshToken').value;
    if (refreshToken) {
      try {
        const tokenRefreshResponse = await fetch(
          config.public.apiBase + '/token/refresh',
          {
            method: 'POST',
            body: JSON.stringify({ refresh_token: refreshToken }),
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const tokenData = await tokenRefreshResponse.json();
        authStore.setTokens(tokenData.token, tokenData.refresh_token);

        // Retry the original request after refreshing the token
        return api(request.url, request.options); // You may need to pass the original request information for retry
      } catch (error) {
        console.error('Token refresh failed:', error);
        authStore.clearAuth();
        navigateTo('/admin/login');
      }
    } else {
      authStore.clearAuth();
      navigateTo('/admin/login');
    }
  };

  // Provide the api function globally to use in components
  nuxtApp.provide('apiV2', apiV2);
});
