<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">Sample Test</slot>
        </div>
        <div class="modal-body">
          <slot name="body">Body of modal dialog</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: Boolean,
});
</script>

<style lang="postcss">
.modal-mask {
  @apply fixed z-auto top-0 left-0 w-full h-full bg-gray-300 bg-opacity-60 flex transition-opacity;
}
.modal-container {
  @apply m-auto w-80 p-5 bg-white border-2 rounded-lg shadow-sm transition-all;
}
.modal-header h3 {
  @apply mt-0 bg-light_shades py-2 text-center text-white rounded-lg font-bold;
}
.modal-body {
  @apply m-5 overflow-y-scroll;
}
.modal-footer {
  @apply flex justify-center;
}
.modal-default-button {
  @apply w-1/2 border-2 border-light_shades rounded-lg text-white  bg-light_shades;
  &:hover {
    @apply bg-white text-light_shades;
  }
  &:active {
    @apply bg-light_shades text-white;
  }
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