<template>
  <label class="switch">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="sr-only peer"
    />
    <div class="slider peer"></div>
    <span class="switchText"> <slot /></span>
  </label>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style lang="postcss">
.switch {
  @apply inline-flex items-center me-2 cursor-pointer;
}
.slider {
  @apply relative w-11 h-6 bg-second rounded-full peer-focus:ring-0 peer-focus:ring-primary_mono peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-light_shades after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-light_shades after:border-light_shades after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary;
}
.switchText {
  @apply ms-2;
}
</style>