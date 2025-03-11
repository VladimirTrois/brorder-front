<template>
  <div
    class="productContainer"
    :class="product.isAvailable ? null : 'opacity-50'"
  >
    <Image class="productImage" :filename="product.image" :id="product.name" />
    <label class="productLabel" :for="product.name">
      <p>
        {{ product.name }} <br />
        {{ (product.price / 100).toFixed(2) }}€
      </p>
      <p v-if="forAdmin">
        Ordre : {{ product.rank }}
        <br />
        Stock : {{ product.stock === -1 ? "Illimité" : product.stock }}
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
  @apply max-w-20 md:max-w-32 lg:max-w-40 p-1 static float-start rounded-lg;
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
  @apply block text-center overflow-x-scroll text-nowrap text-sm md:text-base relative;
}
</style>