<template>
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav class="md:flex hidden space-x-4 flex-grow">
            <NavBarLink to="/" text="Commande"/>
            <NavBarLink to="/informations" text="Allèrgenes"/>
        </nav>
        <img src="/img/Logo.svg" alt="Logo" class="w-20 h-20 fill-current"/>
        <button @click="toggleNav" class="md:hidden focus:outline-none text-gray-800">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path v-if="!isOpen" d="M4 6h16v2H4V6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path v-else d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            Toggle
        </button>
    </div>
    <nav class="md:hidden" v-if="isOpen">
        <ul class="flex flex-col space-y-4 mt-6">
            <li><NavBarLink to="/" text="Commande"/></li>
            <li><NavBarLink to="/informations" text="Allèrgenes"/></li>
        </ul>
    </nav>
</template>


<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleNav() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="postcss" scoped>
</style>