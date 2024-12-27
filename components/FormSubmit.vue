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
  @apply text-lg md:text-xl m-2 p-1 px-5 rounded-md border-2
  bg-second text-light_shades border-second;
  &:hover {
    @apply bg-light_shades text-black border-second;
  }
  &:active {
    @apply bg-second text-light_shades border-second;
  }
}
</style>