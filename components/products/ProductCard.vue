<template>
  <div class="productContainer">
    <NuxtImg class="productImage" :src="product.image" /><br />
    <label class="productLabel" :for="product.name">
      {{ product.name }}
      <br />
      {{ (product.price / 100).toFixed(2) }}€
    </label>
  </div>
</template>

<script setup>
defineProps({
  product: Object,
});
</script>

<style lang="postcss" scoped>
.productContainer {
  @apply w-28 md:w-32 inline p-1 static float-start rounded-lg justify-center place-items-center;
  &:hover {
    @apply bg-gray-200 border border-primary;
  }
  &:active {
    @apply border-transparent;
  }
}
.productImage {
  @apply rounded-lg w-fit;
}
.productLabel {
  @apply block text-center text-sm relative -top-4;
}
</style>