<template>
  <div class="grid md:grid-cols-5 gap-2">
    <div class="md:col-span-2">
      <FormItems />
    </div>
    <div class="md:col-span-3">
      <LazyProductCard
        v-for="p in collectionProduct.productsFromCurrentPage"
        :key="p.name"
        :product="p"
        @click="addProduct(p)"
      />
    </div>
  </div>
</template>

<script setup>
import { useCollectionProduct } from "~/stores/collectionProduct";
const collectionProduct = useCollectionProduct();
collectionProduct.fetchProducts();
const order = useOrder();

const addProduct = (product) => {
  let productIndex = order.value.items.findIndex(
    (item) => item.name == product.name
  );
  if (productIndex === -1) {
    product.quantity = 1;
    order.value.items.push(product);
  } else {
    order.value.items[productIndex].quantity++;
  }
};
</script>

<style lang="postcss">
.formGrid {
  @apply grid md:grid-cols-5 gap-2;
}
</style>