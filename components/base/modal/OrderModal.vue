<template>
  <Teleport to="body">
    <ModalDialog :show="isOpen" @close="$emit('close')" :color="color">
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <template #body>
        <OrderView :order="order" />
      </template>
      <template #footer>
        <div class="grid grid-cols-2">
          <IconButton
            class="mr-3"
            :color="color"
            name="material-symbols:check-box"
            @click="
              $emit('sell');
              $emit('close');
            "
          />
          <IconButton
            class="ml-9"
            color="second"
            name="material-symbols:cancel"
            @click="$emit('close')"
          />
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
  order: Object,
  color: {
    type: String,
    default: "primary",
  },
});

defineEmits(["sell", "renew", "close"]);
</script>

<style lang="postcss">
</style>