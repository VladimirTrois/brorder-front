import { defineEventHandler, readBody, setCookie, createError } from 'h3';
import fetch from 'node-fetch'; // Use node-fetch for external API calls

export default defineEventHandler(async (event) => {
  // Get credentials from the request body
  const { username, password } = await readBody(event);
  const config = useRuntimeConfig();

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: 'Username and password are required',
    });
  }

  console.log(username);
  console.log(password);

  try {
    // Forward credentials to the external authentication API
    const { token, refreshToken } = await $fetch(
      config.public.apiBase + '/login',
      {
        method: 'POST',
        body: { username, password },
      },
    );

    // Send a session ID to the client (this is an HTTP-only cookie)
    setCookie(event, 'sessionId', token, {
      httpOnly: true, // Cookie cannot be accessed by JavaScript
      secure: true, // Use secure cookies (only over HTTPS)
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24 * 7, // Set expiration (1 week)
    });

    return { message: 'Login successful', token, refreshToken };
  } catch (error) {
    // Handle errors gracefully
    throw createError({
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message || 'An error occurred during login',
    });
  }
});
