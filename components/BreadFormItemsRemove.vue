<template>
    <NuxtImg 
        class="image"
        src="/img/minus.svg" 
        alt="-"
        loading="lazy"
        @click="click"
    />
</template>

<script setup>
defineProps({
    src: string,
    alt: string,
})
</script>