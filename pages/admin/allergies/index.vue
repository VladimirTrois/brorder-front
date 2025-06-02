<template>
  <div>
    <LazyProductInfosTable
      v-if="collectionProduct.productsFromCurrentPage"
      class="mb-4"
      :isPublic="false"
    />
    <IconButton
      v-else
      size="sm"
      name="material-symbols:refresh"
      @click="refreshPage"
    />
    <LazyAllergyForm v-if="allergies.collection" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Allergies",
});

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