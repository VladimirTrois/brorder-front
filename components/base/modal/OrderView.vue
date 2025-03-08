<template>
  <div v-if="order" class="orderView">
    <div class="text-center font-bold text-xl w-full mb-2">
      {{ order.name[0].toUpperCase() + order.name.slice(1).toLowerCase() }}
      {{ order.pitch }}
    </div>
    <div
      class="grid grid-cols-3 gap-1 w-full"
      v-for="item in order.items"
      :key="item.product.name"
    >
      <div class="text-left col-span-2 md:text-lg w-full flex">
        {{ item.product.name }}
      </div>
      <div class="text-right md:text-lg w-full">
        {{ item.quantity }} x {{ (item.product.price / 100).toFixed(2) }} €
      </div>
    </div>
    <div class="text-right text-lg mt-2 font-bold">
      Total: {{ (order.total / 100).toFixed(2) }} €
    </div>
  </div>
</template>

<script setup>
defineProps({
  order: Object,
});
</script>

<style lang="postcss">
.orderView {
  @apply m-1 p-2 rounded-lg bg-primary_a10;
}
</style>