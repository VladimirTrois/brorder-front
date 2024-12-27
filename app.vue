<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtLoadingIndicator color="secondary" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const config = useAppConfig();

useSeoMeta({
  title: config.title,
  description: config.description,
  author: config.author,
});
useHead({
  link: config.link,
  htmlAttrs: { lang: "fr" },
});
</script>