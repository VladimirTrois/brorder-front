<template>
  <NuxtLink class="navBarLink">
    <slot />
  </NuxtLink>
</template>

<style lang="postcss">
.navBarLink {
  @apply block rounded px-2 py-1 mt-1 text-xl sm:mt-0 sm:ml-4 text-primary_a5;
  &:hover {
    @apply underline underline-offset-8 decoration-4 decoration-second;
  }
}
.router-link-exact-active {
  @apply text-light_shades;
}
</style>