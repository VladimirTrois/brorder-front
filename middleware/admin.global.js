// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {

  //const { loggedIn } = useUserSession()

  // redirection only for admin
  if (!to?.name.includes("admin")) {
    return;
  }

  // if (!loggedIn.value) {
  //   return navigateTo('/admin/login')
  // }

  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies
  console.log("here")
  console.log(token)
  console.log(authenticated.value)

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

