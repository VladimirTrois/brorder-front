<template>
  <div class="app">
    <NavBar>
      <NavBarLink to="/admin" text="Aujourd'hui" />
      <NavBarLink to="/admin/commandes" text="Commandes" />
      <NavBarLink to="/admin/products" text="Produits" />
      <NavBarLink to="/admin/stats" text="Statistique" />
      <a href="/admin/login">
        <button class="logoutBtn group" @click="logout">
          <Icon class="logoutIcon" name="hugeicons:logout-05" size="2em" />
        </button>
      </a>
    </NavBar>
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/stores/auth"; // import the auth store we just created
const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.preference === "dark"
    ? (colorMode.preference = "light")
    : (colorMode.preference = "dark");
};

const router = useRouter();
const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>

<style lang="postcss">
.app {
  @apply bg-light_shades;
}
.main {
  @apply container mx-auto px-4 pt-4 flex-grow text-sm sm:text-base text-black bg-light_shades;
}
.h1 {
  @apply text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-none tracking-tight;
}
.h2 {
  @apply text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight;
}
.logoutBtn {
  @apply m-1 px-1 pt-1 float-end rounded-lg text-light_shades;
  &:hover {
    @apply bg-light_shades text-primary;
  }
  &:active {
    @apply bg-transparent;
  }
}
.logoutIcon {
  @apply bg-light_shades group-hover:bg-primary group-active:bg-light_shades;
}

footer {
  @apply bg-primary_mono text-light_shades p-4 text-center;
}
</style>


