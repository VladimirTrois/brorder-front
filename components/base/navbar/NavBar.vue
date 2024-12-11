<template>
  <div class="navbar" id="navBar">
    <div class="top" id="navBar">
      <div>
        <img src="/img/Logo.svg" alt="Logo" class="logo" />
      </div>
      <div class="sm:hidden">
        <button type="button" @click="toggleNav">
          <SvgoBurgerMenu v-if="!isOpen" class="toggleIcon" />
          <SvgoX v-else class="toggleIcon" />
        </button>
      </div>
    </div>
    <div class="drawer" :class="isOpen ? 'block' : 'hidden'">
      <slot />
    </div>
  </div>
</template>


<script setup>
const isOpen = ref(false);

const toggleNav = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="postcss" scoped>
.navbar {
  @apply sm:flex sm:justify-start sm:px-5 sm:py-2 sm:items-center bg-primary_mono;
}
.top {
  @apply flex items-center justify-between px-5 py-2 sm:p-0;
}
.drawer {
  @apply px-3 sm:flex sm:p-0;
}
.logo {
  @apply h-14 fill-current;
}
.toggleIcon {
  @apply w-10 h-10 fill-current text-light_shades bg-transparent rounded-md border-2 border-transparent;
  &:hover {
    @apply text-primary_mono bg-light_shades;
  }
  &:active {
    @apply text-light_shades bg-transparent;
  }
}
</style>