<template>
  <div class="app">
    <NavBar>
      <NavBarLink to="/" text="Retour" />
    </NavBar>
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>