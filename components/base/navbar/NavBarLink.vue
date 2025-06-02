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
  @apply block rounded px-1 text-light_shades mt-1 text-lg sm:text-base lg:ml-4 lg:text-xl sm:mt-0   sm:py-1;
  &:hover {
    @apply underline underline-offset-4 md:underline-offset-8 decoration-4 decoration-second;
  }
}
.router-link-exact-active {
  @apply text-second font-bold;
}
</style>