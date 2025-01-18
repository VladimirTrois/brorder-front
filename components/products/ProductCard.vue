<template>
  <div
    class="productContainer"
    :class="product.isAvailable ? null : 'opacity-50'"
  >
    <NuxtImg
      class="productImage"
      :src="product.image"
      :id="product.name"
    /><br />
    <label class="productLabel" :for="product.name">
      {{ product.name }}
      <br />
      {{ (product.price / 100).toFixed(2) }}€
      <br />
      <p v-if="forAdmin">
        Ordre : {{ product.rank }}
        <br />
        Stock : {{ product.stock }}
      </p>
    </label>
  </div>
</template>

<script setup>
defineProps({
  product: Object,
  forAdmin: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="postcss" scoped>
.productContainer {
  @apply w-28 md:w-36 inline p-1 static float-start rounded-lg justify-center place-items-center;
  &:hover {
    @apply bg-gray-200 border border-dark_accent;
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