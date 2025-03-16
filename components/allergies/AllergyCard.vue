<template>
  <div class="allergyContainer">
    {{ allergy.name }}
  </div>
</template>
    
  <script setup>
const props = defineProps(["allergy"]);
</script>
    
    <style lang="postcss" scoped>
.allergyContainer {
  @apply min-w-32 max-w-40 p-1 inline static float-start rounded-lg border border-transparent justify-center place-items-center;
  &:hover {
    @apply bg-gray-200 border border-dark_accent;
  }
  &:active {
    @apply border-transparent;
  }
}
</style>