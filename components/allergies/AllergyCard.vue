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
  @apply p-1 rounded-lg border border-transparent text-nowrap;
  &:hover {
    @apply bg-gray-200 border border-dark_accent;
  }
  &:active {
    @apply border-transparent;
  }
}
</style>