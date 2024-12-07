<template>
  <span v-if="status === 'pending'">Loading...</span>
  <span v-else-if="data">
    <LazyForm :productsToSell="data.member" />
  </span>
  <span v-else-if="error">Error: {{ error }}</span>
</template>

<script setup>
const { data, status, error, refresh, clear } = await useFetch(
  import.meta.env.VITE_API_URL + "/products?page=1"
);
</script>