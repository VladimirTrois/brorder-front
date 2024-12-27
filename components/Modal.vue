<template>
  <Teleport to="body">
    <ModalDialog :show="isOpen" @close="$emit('close')" :color="color">
      <div>coucou</div>
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <template #body>
        <div class="text-center">
          {{ message }}
        </div>
      </template>
    </ModalDialog>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  message: String,
  color: {
    type: String,
    default: "primary",
  },
});

defineEmits(["close"]);
</script>

<style lang="postcss">
</style>