<template>
  <button
    :class="['buttonWithIcon', 'group', colorClassesButton, sizeClass]"
    class="w-max"
  >
    <Icon :class="[colorClassesIcon, sizeClass]" :name="name" />
  </button>
</template>

<script setup>
const props = defineProps({
  name: String,
  color: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
});

const colorClassesButton = computed(() => {
  switch (props.color) {
    case "primary":
      return "bg-transparent hover:bg-primary active:bg-transparent";
    case "second":
      return "bg-transparent hover:bg-second active:bg-transparent";
    // Add more color options as needed
    default:
      return "bg-transparent hover:bg-primary_mono active:bg-transparent";
  }
});

const colorClassesIcon = computed(() => {
  switch (props.color) {
    case "primary":
      return "bg-primary group-hover:bg-light_shades group-active:bg-primary";
    case "second":
      return "bg-second group-hover:bg-light_shades group-active:bg-second";
    // Add more color options as needed
    default:
      return "bg-primary_mono group-hover:bg-light_shades group-active:bg-primary_mono";
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "2xs":
      return "size-4 md:size-6";
    case "xs":
      return "size-6 md:size-8";
    case "sm":
      return "size-8 md:size-10";
    case "md":
      return "size-10 md:size-12";
    case "lg":
      return "size-12 md:size-14";
    case "xl":
      return "size-14 md:size-16";
    default:
      return "size-10 md:size-12";
  }
});
</script>

<style lang="postcss" scoped>
.buttonWithIcon {
  z-index: 0;
  @apply flex items-center justify-center rounded-lg;
}
</style>