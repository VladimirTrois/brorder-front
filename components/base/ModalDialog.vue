<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div :class="['modal-header', colorClasses]">
          <slot name="header">Sample Test</slot>
        </div>
        <div class="modal-body">
          <slot name="body">Body of modal dialog</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <Button
              class="modal-default-button"
              :color="color"
              @click="$emit('close')"
            >
              Fermer
            </Button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  color: {
    type: String,
    default: "primary",
  },
});

const colorClasses = computed(() => {
  switch (props.color) {
    case "primary":
      return "bg-primary";
    case "second":
      return "bg-second";
    // Add more color options as needed
    default:
      return "bg-primary_mono";
  }
});
</script>

<style lang="postcss">
.modal-mask {
  @apply z-50 fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-60 flex transition-opacity;
}
.modal-container {
  @apply m-auto w-80 md:w-96  p-5 bg-light_shades border-2 rounded-lg shadow-sm transition-all;
  &:hover {
    @apply border-primary;
  }
}
.modal-header {
  @apply mt-0 py-2 text-center text-light_shades rounded-lg font-bold;
}
.modal-body {
  @apply m-5 overflow-y-scroll;
}
.modal-footer {
  @apply flex justify-center;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>