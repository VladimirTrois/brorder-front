<template>
  <div class="appLogin">
    <main class="mainLogin">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
watch(
  () => route.query,
  () => refreshNuxtData()
);
</script>

<style lang="postcss">
.appLogin {
  @apply bg-primary mx-auto h-screen flex flex-col flex-1;
}
.mainLogin {
  @apply bg-transparent mx-auto px-4 pt-4 flex-grow;
}
footer {
  @apply bg-primary_mono text-light_shades p-4 text-center;
}
</style>