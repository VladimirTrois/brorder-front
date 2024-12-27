<template>
  <div class="itemContainer">
    <label class="itemLabel">
      {{ item.quantity }} x {{ item.product.name }}
      <br />
    </label>
  </div>
</template>
    
    <script setup>
defineProps({
  item: Object,
});
</script>