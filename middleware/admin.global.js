// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {

  // redirection only for admin
  if (!to?.name.includes("admin")) {
    return;
  }

  //const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies

  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
  }
  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'admin-login') {
    return navigateTo('/admin');
  }
  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'admin-login') {
    abortNavigation();
    return navigateTo('/admin/login');
  }
});  

