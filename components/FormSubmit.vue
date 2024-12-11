<template>
  <button class="buttonSubmit" :form="form" type="submit">
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: String,
  form: String,
});
</script>

<style lang="postcss">
.buttonSubmit {
  @apply bg-white text-lg md:text-xl m-2 p-1 px-5 rounded-md border-dark_shades border-2 text-dark_shades;
  &:hover {
    @apply bg-dark_shades text-white border-white;
  }
  &:active {
    @apply bg-dark_accent;
  }
}
</style>