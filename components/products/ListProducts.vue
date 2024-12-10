<template>
  <div>
    <ProductCard
      v-for="p in productStore.products"
      :key="p.name"
      :product="p"
      @click="addProduct(p)"
    />
  </div>
</template>

<script setup>
import { useProductStore } from "~/stores/ProductStore";
const productStore = useProductStore();
productStore.getProducts();

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