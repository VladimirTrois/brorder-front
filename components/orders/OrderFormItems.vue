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
  @apply gap-4;
}
.carrouselProduct {
  @apply gap-4;
}

@media (max-width: 768px) {
  .carrouselProducts {
    @apply flex overflow-x-auto px-1 -mx-1 snap-x snap-proximity;
  }

  .productInCarrousel {
    @apply min-w-32 snap-center;
  }
}
</style>