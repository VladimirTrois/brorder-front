<template>
  <span v-if="asyncStatus === 'loading'">App is {{ asyncStatus }}</span>
  <span v-else-if="state.data">
    <NuxtErrorBoundary>
      <LazyForm :productsToSell="state.data.member" />
      <template #error="{ error }">
        The error:

        <pre>{{ error }}</pre>
      </template>
    </NuxtErrorBoundary>

    <div v-for="product in productStore.products" :key="product.name">
      product : {{ product.name }}
    </div>
  </span>
  <span v-else-if="state.status === 'error'"
    >Ooops an error happened... : {{ state.error }}</span
  >
</template>

<script setup>
// const { getCollection } = useProducts();
// const page = 1;
// import { useProductStore } from "~/stores/ProductStore";
// const productStore = useProductStore();
// //const { data, status, error, refresh, clear } = await getCollection(page);

// // const { data, status, error, refresh, clear } = await useBrorder(
// //   "/api/products"
// // );
// productStore.getProducts();
// const { state, asyncStatus, refresh, refetch } = useQuery({
//   key: ["products"],
//   query: () => useBrorder("/api/products").then((res) => res.data.value),
// });
</script>