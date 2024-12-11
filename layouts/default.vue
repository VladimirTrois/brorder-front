<template>
  <div class="app">
    <NavBar>
      <NavBarLink to="/" text="Commande" />
      <NavBarLink to="/informations" text="Allèrgenes" />
      <ThemeSwitch />
    </NavBar>
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="postcss">
.main {
  @apply container mx-auto px-4 pt-4 flex-grow text-sm sm:text-base text-black bg-light_shades;
}
.h1 {
  @apply text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-none tracking-tight;
}
.h2 {
  @apply text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight;
}

footer {
  @apply bg-primary_mono text-light_shades p-4 text-center;
}
</style>