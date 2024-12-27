<template>
  <button :class="['buttonBase', colorClass]">
    <slot />
  </button>
</template>
  
  <script setup>
const props = defineProps({
  color: {
    type: String,
    default: "primary",
  },
});

const colorClass = computed(() => {
  switch (props.color) {
    case "primary":
      return "bg-primary text-light_shades border-primary hover:bg-transparent hover:text-primary active:bg-primary active:text-light_shades";
    case "second":
      return "bg-second text-light_shades border-second hover:bg-transparent hover:text-second active:bg-second active:text-light_shades";
    // Add more color options as needed
    default:
      return "bg-primary_mono text-light_shades border-primary_mono hover:bg-transparent hover:text-primary_mono active:bg-primary_mono active:text-light_shades";
  }
});
</script>
  
  <style lang="postcss" scoped>
.buttonBase {
  @apply px-2 rounded-md border-2 max-w-[fit-content];
}
</style>