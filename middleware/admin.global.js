// middleware/auth.ts
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // redirection only for admin pages
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
