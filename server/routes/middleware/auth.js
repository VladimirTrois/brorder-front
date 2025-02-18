import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
  // Secure the endpoint (authentication or validation)
  const authHeader = getHeader(event, 'Authorization'); // Get token from the Authorization header
  const config = useRuntimeConfig();

  if (!authHeader) {
    throw createError({ statusCode: 404, message: 'Page not found' });
  }

  try {
    // Test API to verify credentials (not the best security...)
    const response = await $fetch(config.public.apiBase + '/orders', {
      method: 'GET',
      headers: {
        Authorization: authHeader,
      },
    });
    if (!response) {
      throw createError({ statusCode: 404, message: 'Page not found' });
    }
  } catch (error) {
    // Handle errors gracefully
    throw createError({
      statusCode: error.response?.status || 404,
      message: error.response?.data?.message || 'Page not found',
    });
  }
});
