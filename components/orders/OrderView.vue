<template>
  <div v-if="order" class="text-left">
    <div class="text-center">{{ order.name }} {{ order.pitch }}</div>
    <div class="qrid grid-cols-2 gap-2 w-full">
      <div v-for="item in order.items" :key="item.product.name">
        <div>{{ item.quantity }} x {{ item.product.name }} :</div>
        <div>{{ (item.product.price / 100).toFixed(2) }} €</div>
      </div>
    </div>
    <div class="text-center">Total: {{ (order.total / 100).toFixed(2) }} €</div>
  </div>
</template>

<script setup>
defineProps({
  order: Object,
});
</script>