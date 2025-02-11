import { useAuthStore } from '~/stores/auth.js';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};

export function useCustomFetch(url, options) {
  const config = useRuntimeConfig();
  const { isSignedIn, getToken } = useAuthStore();

  const defaults = {
    baseURL: config.public.apiBaseUrl,
    key: url,

    onRequest({ options }) {
      options.headers = isSignedIn
        ? { Authorization: `Bearer ${getToken()}` }
        : {};
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}

function request(method) {
  return (url, body) => {
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/ld-json';
      requestOptions.body = JSON.stringify(body);
    }
    console.log(requestOptions);
    return $fetch(url, {
      onRequest({ options }) {
        options.headers.set('Authorization', authHeader(url));
      },
    }).then(handleResponse);
  };
}

// helper functions

function authHeader(url) {
  console.log('Auth Header');
  const token = useCookie('token');
  // return auth header with jwt if user is logged in and request is to the api url
  const { user, authenticated } = useAuthStore();
  const isLoggedIn = !!user?.authenticated;
  const isApiUrl = url.startsWith(import.meta.env.NUXT_API_URL);
  if (authenticated && isApiUrl) {
    return `Bearer ${token.value}`;
  } else {
    return '';
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
