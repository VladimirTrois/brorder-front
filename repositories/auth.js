export default (api) => ({
  login: (credentials) =>
    api('/login', {
      method: 'POST',
      body: credentials,
    }),
  refreshToken: (refreshToken) =>
    api('/token/refresh', {
      method: 'POST',
      body: { refreshToken },
    }),
});
