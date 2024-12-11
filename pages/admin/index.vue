<template>
  <div v-if="loggedIn">
    <h1>Welcome {{ user.login }}!</h1>
    <p>Logged in since {{ session.loggedInAt }}</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <a href="/auth/github">Login with GitHub</a>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Login",
});

const { loggedIn, user, session, fetch, clear } = useUserSession();
</script>
