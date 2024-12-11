<template>
  <div class="app">
    <NavBar>
      <NavBarLink to="/admin/today" text="Aujourd'hui" />
      <NavBarLink to="/admin/products" text="Produits" />
      <NavBarLink to="/admin/stats" text="Statistique" />
      <li v-if="!authenticated" class="loginBtn" style="float: right">
        <nuxt-link to="/login">Login</nuxt-link>
      </li>
      <li v-if="authenticated" class="loginBtn" style="float: right">
        <nuxt-link @click="logout">Logout</nuxt-link>
      </li>
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


