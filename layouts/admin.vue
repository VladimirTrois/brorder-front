<template>
  <div class="app">
    <NavBar>
      <NavBarLink to="/admin" text="Aujourd'hui" />
      <NavBarLink to="/admin/orders" text="Commandes" />
      <NavBarLink to="/admin/products" text="Produits" />
      <NavBarLink to="/admin/stats" text="Statistiques" />
      <NavBarLink to="/admin/products/images" text="Images" />
      <div class="w-full flex justify-end">
        <a href="/admin/login">
          <IconButton
            class="logoutBtn"
            color="primary"
            size="md"
            name="material-symbols:logout"
            @click="logout"
          />
        </a>
      </div>
    </NavBar>
    <main class="mainAdmin">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
const { logout } = useAuth();
</script>

<style lang="postcss">
.app {
  @apply bg-light_shades mx-auto h-screen flex flex-col flex-1;
}
.mainAdmin {
  @apply container mx-auto px-4 pt-4 flex-grow text-sm sm:text-base text-black bg-transparent;
}
h1 {
  @apply text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-none tracking-tight;
}
h2 {
  @apply text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight;
}
h3 {
  @apply text-base sm:text-xl md:text-2xl lg:text-3xl tracking-tight;
}
.logoutBtn {
  @apply m-1 px-1 pt-1 rounded-lg;
}

footer {
  @apply bg-primary_mono text-light_shades p-4 text-center;
}
</style>


