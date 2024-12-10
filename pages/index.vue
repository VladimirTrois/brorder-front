<template>
  <span v-if="status === 'pending'">{{ status }}</span>
  <span v-else-if="data">
    <LazyForm :productsToSell="data.member" />
  </span>
  <span v-else-if="error">Error: {{ error }}</span>
</template>

<script setup>
const { getCollection } = useProducts();
const page = 1;
const { data, status, error, refresh, clear } = await getCollection(page);
console.log(data, status, error, refresh, clear);
</script>