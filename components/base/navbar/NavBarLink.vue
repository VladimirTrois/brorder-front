<template>
  <NuxtLink class="navBarLink" @click="refreshNavigation">
    <slot />
  </NuxtLink>
</template>

<script setup>
import { refreshNuxtData } from "#app";

const refreshNavigation = async () => {
  await refreshNuxtData();
};
</script>

<style lang="postcss">
.navBarLink {
  @apply block rounded px-2 text-light_shades mt-1 text-lg sm:mt-0 sm:ml-4  sm:py-1 md:text-xl;
  &:hover {
    @apply underline underline-offset-4 md:underline-offset-8 decoration-4 decoration-second;
  }
}
.router-link-exact-active {
  @apply text-second font-bold;
}
</style>