<template>
    <NuxtLink class="navBarLink">
        {{ text }} 
    </NuxtLink>
</template>

<script setup>
defineProps({
  text: String,
})
</script>

<style lang="postcss" scoped>
.navBarLink {
    @apply text-primary inline-block ;
    &:hover {
        @apply underline underline-offset-8 decoration-4 decoration-secondary;
    }
    &:active{
        @apply font-extrabold;
    }
    &:focus{
        @apply font-extrabold;
    }
}
</style>