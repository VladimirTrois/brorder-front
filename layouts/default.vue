<script>
import AppFooter from '~/components/componentsLayouts/AppFooter.vue';
import AppHeader from '~/components/componentsLayouts/AppHeader.vue';
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>