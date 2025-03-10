<template>
  <div class="carrouselProducts">
    <LazyProductCard
      class="productInCarrousel"
      v-for="product in products"
      :key="product.name"
      :product="product"
      :forAdmin="forAdmin"
      @click="$emit('clickProduct', product)"
    />
  </div>
</template>

<script setup>
defineProps({
  products: [Object],
  forAdmin: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["clickProduct"]);
</script>

<style lang="postcss" scoped>
.carrouselProducts {
  @apply inline-block;
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