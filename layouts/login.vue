<template>
  <div class="app">
    <!-- <NavBar>
      <NavBarLink to="/" text="Retour" />
      <ThemeSwitch />
    </NavBar> -->
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="postcss">
.app {
  @apply bg-primary;
}
.main {
  @apply mx-auto px-4 pt-4 flex-grow;
}
footer {
  @apply bg-primary_mono text-light_shades p-4 text-center;
}
</style>