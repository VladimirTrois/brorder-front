<template>
  <div class="grid md:grid-cols-5 gap-2">
    <div class="md:col-span-2">
      <OrderFormItemsTable v-if="singleOrder.order.items.length > 0" />
      <p
        v-else
        class="text-center text-xl"
        :class="singleOrder.formErrors.items ? 'text-second' : ''"
      >
        Selectionnez des articles
        <br />
        Choose products
      </p>
      <div class="text-second text-center" v-if="singleOrder.formErrors.items">
        {{ singleOrder.formErrors.items }}
      </div>
    </div>
    <div
      v-if="collectionProduct.productsFromCurrentPage"
      class="carrouselProducts md:col-span-3"
    >
      <LazyProductCard
        class="productInCarrousel"
        v-for="availableProduct in collectionProduct.productsFromCurrentPage.filter(
          (p) => p.stock !== 0
        )"
        :key="availableProduct.name"
        :product="availableProduct"
        @click="addProduct(availableProduct)"
      />
    </div>
  </div>
</template>

<script setup>
import { useCollectionProduct } from "~/stores/collectionProduct";
const singleOrder = useSingleOrder();
const collectionProduct = useCollectionProduct();
collectionProduct.isAvailable = true;
collectionProduct.fetchProducts();

const addProduct = (product) => {
  singleOrder.formErrors.items = "";
  singleOrder.addProduct(product);
};

// Load images on page load
onMounted(() => {
  collectionProduct.fetchProducts();
});
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