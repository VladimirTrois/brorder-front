<template>
  <div>event id: {{ $route.params.id }}</div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Products",
});

const route = useRoute();
const nuxt = useNuxtApp();
</script>