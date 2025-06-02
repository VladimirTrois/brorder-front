<template>
  <div>
    <LazyProductInfosTable
      v-if="collectionProduct.productsFromCurrentPage"
      class="mb-4"
      :isPublic="true"
    />
    <IconButton
      v-else
      size="sm"
      name="material-symbols:refresh"
      @click="refreshPage"
    />
  </div>
</template>

<script setup>
const allergies = useAllergies();
const collectionProduct = useCollectionProduct();

const refreshPage = async () => {
  collectionProduct.reset();
  collectionProduct.isAvailable = true;
  await allergies.fetchAllergies();
  await collectionProduct.fetchProductsWithAllergies();
};

onMounted(() => {
  refreshPage();
});
</script>