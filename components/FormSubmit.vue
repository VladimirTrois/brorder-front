<template>
  <button class="buttonSubmit" @click="click" :form="form" type="submit">
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
  @apply bg-white text-lg md:text-xl m-2 p-1 px-5 rounded-md border-secondary border-2 text-secondary;
  &:hover {
    @apply bg-secondary text-white border-white;
  }
}
</style>