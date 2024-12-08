<template>
  <div class="app">
    <NavBar>
      <NavBarLink to="/admin/today" text="Aujourd'hui" />
      <NavBarLink to="/admin/products" text="Produits" />
      <NavBarLink to="/admin/stats" text="Statistique" />
    </NavBar>
    <main class="main">
      <slot />
    </main>
    <Footer />
  </div>
</template>