<template>
  <button :class="['buttonWithIcon', 'group', colorClassesButton, sizeClass]">
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
    default: "10",
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
    case "xs":
      return "size-6";
    case "sm":
      return "size-8";
    case "md":
      return "size-10";
    case "lg":
      return "size-12";
    case "xl":
      return "size-14";
    default:
      return "size-10";
  }
});
</script>

<style lang="postcss" scoped>
.buttonWithIcon {
  z-index: 0;
  @apply flex items-center justify-center rounded-lg;
}
</style>