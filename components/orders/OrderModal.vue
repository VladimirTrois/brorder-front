<template>
  <Teleport to="body">
    <ModalDialog :show="isOpen" @close="$emit('close')" :color="color">
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <template #body>
        <div class="text-center"></div>
        <OrderView :order="message" />
      </template>
    </ModalDialog>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  message: Object,
  order: Object,
  color: {
    type: String,
    default: "primary",
  },
});

defineEmits(["close"]);
</script>

<style lang="postcss">
</style>