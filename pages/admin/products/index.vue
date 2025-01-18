<template>
  <div class="grid md:grid-cols-5 gap-2 mb-4">
    <div class="md:col-span-2">
      <EditFormProduct v-if="singleProduct.product.id" />
      <CreateFormProduct v-else />
    </div>
    <div class="md:col-span-3">
      <div class="mt-8">
        <div class="flex flex-row justify-left">
          <IconButton
            name="material-symbols:add-circle"
            @click="createNewProduct"
          />
          <div
            v-if="singleProduct.product.id"
            class="mx-10 flex flex-col justify-center items-center"
          >
            <div>Produit selectionné :</div>
            <LazyProductCard
              v-if="singleProduct.product.id"
              :key="singleProduct.product.name"
              :product="singleProduct.product"
            />
          </div>
        </div>
        <LazyProductCard
          v-for="p in collectionProduct.productsFromCurrentPage"
          :key="p.name"
          :product="p"
          forAdmin="true"
          @click="singleProduct.product = JSON.parse(JSON.stringify(p))"
        />
        <Pagination
          v-if="collectionProduct.totalPages > 1"
          :currentPage="collectionProduct.currentPage"
          :totalPages="collectionProduct.totalPages"
          @pageChange="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Products",
});

const collectionProduct = useCollectionProduct();
const singleProduct = useSingleProduct();

const createNewProduct = () => {
  singleProduct.newProduct();
};

onMounted(() => {
  collectionProduct.fetchProducts();
});

watch(
  () => collectionProduct.isCollectionFetched,
  (isFetched) => {
    if (isFetched) {
      singleProduct.product =
        collectionProduct.products[collectionProduct.currentPage][0];
    }
  },
  { deep: true }
);
</script>