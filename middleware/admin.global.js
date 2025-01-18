// middleware/auth.ts
import Admin from '~/layouts/admin.vue';
import Login from '~/layouts/login.vue';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // redirection only for admin pages
  console.log(to.path);
  console.log(authStore);
  if (!to.path.includes('admin')) {
    return;
  }

  if (authStore.isAuthenticated && to.path.includes('login')) {
    setPageLayout('admin');
    return navigateTo('/admin');
  }

  // if not authenticated then redirect to login
  if (!authStore.isAuthenticated && !to.path.includes('login')) {
    setPageLayout('login');
    return navigateTo('/admin/login', { replace: true });
  }
});
