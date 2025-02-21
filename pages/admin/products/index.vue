<template>
  <div>
    <h2 class="text-center">Gestion des produits</h2>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
      <LazyFormProduct
        :type-of-form="singleProduct.product.id ? 'edit' : 'create'"
        class="md:col-span-2 justify-self-center md:justify-self-end"
      />
      <div class="md:col-span-3">
        <div
          v-if="singleProduct.product.id"
          class="flex flex-row mb-2 justify-center md:justify-normal"
        >
          <IconButton
            name="material-symbols:add-circle"
            @click="createNewProduct"
          />
          <div class="mx-10 flex flex-col justify-center items-center">
            <div>Produit selectionné :</div>
            <LazyProductCard
              v-if="singleProduct.product.id"
              :key="singleProduct.product.name"
              :product="singleProduct.product"
            />
          </div>
        </div>
        <div v-else class="m-1">Selectionnez un produit pour l'éditer</div>
        <div
          v-if="collectionProduct.productsFromCurrentPage"
          class="carrouselProducts md:col-span-3"
        >
          <LazyProductCard
            class="productInCarrousel"
            v-for="p in collectionProduct.productsFromCurrentPage"
            :key="p.name"
            :product="p"
            :forAdmin="true"
            @click="handleSelectProduct(p)"
          />
        </div>
        <Pagination
          v-if="collectionProduct.totalPages > 1"
          :currentPage="collectionProduct.currentPage"
          :totalPages="collectionProduct.totalPages"
          @pageChange="changePage"
        />
      </div>

      <div class="flex items-center justify-center gap-2 md:col-span-5">
        <IconButton
          color="primary"
          name="material-symbols:imagesmode-outline"
          @click="navigateTo({ path: '/admin/products/images' })"
        />
        <h2 class="mb-2 text-center">Images disponibles :</h2>
      </div>
      <ImagesView class="md:col-span-5" v-if="images" :imageList="images" />
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
const { images, fetchImages } = useImages();

const collectionProduct = useCollectionProduct();
const singleProduct = useSingleProduct();

const createNewProduct = () => {
  singleProduct.newProduct();
};

const handleSelectProduct = (product) => {
  singleProduct.product = JSON.parse(JSON.stringify(product));
};

onMounted(() => {
  fetchImages();
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


<style lang="postcss">
.carrouselProducts {
  @apply grid grid-cols-4 place-items-start gap-1;
}
.productInCarrousel {
  @apply max-w-fit;
}

@media (max-width: 768px) {
  .carrouselProducts {
    @apply flex overflow-x-auto px-6 -mx-4 snap-x snap-proximity sm:-mx-7;
  }

  .productInCarrousel {
    @apply min-w-32 snap-center;
  }
}
</style>