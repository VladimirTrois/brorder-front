<template>
    <NuxtImg 
        class="image"
        src="/img/bin.svg" 
        alt="delete"
        loading="lazy"
        @click="item.quantity=0"
    />
    <NuxtImg 
        class="image"
        src="/img/minus.svg" 
        alt="-"
        loading="lazy"
        @click="item.quantity--"
    />
    <p>{{item.quantity}}</p>
    <NuxtImg 
        class="image"
        src="/img/plus.svg" 
        alt="+"
        loading="lazy"
        @click="item.quantity++"
    />
</template>

<script setup>
defineProps({
    item: Object,
    index: Number
})
</script>

<style lang="postcss">
.image {
    @apply w-5 border-2 mx-1 rounded; 
    &:hover {
        @apply border-2 border-secondary;
    }
}
</style>