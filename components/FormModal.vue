<template>
  <Teleport to="body">
    <ModalDialog :show="show" @close="$emit('close')">
      <template #header>
        <h3>Success</h3>
      </template>
      <template #body>
        <h4>Your order :</h4>
        <h5 v-for="item in showItems" :key="item.product.name">
          {{ item.quantity }} x {{ item.product.name }}
        </h5>
      </template>
    </ModalDialog>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
});
</script>