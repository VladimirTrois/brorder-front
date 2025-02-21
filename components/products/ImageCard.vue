<template>
  <div class="imageContainer">
    <Image class="image" :filename="filename" @click="emit('click')" /><br />
    <div class="flex items-center -mt-4">
      <IconButton
        class="text-center"
        size="sm"
        color="primary"
        name="material-symbols:content-copy-outline"
        @click="copyToClipboard"
      />
      <label class="imageLabel" :for="filename">{{ filename }} </label>
    </div>
  </div>
</template>
  
<script setup>
const props = defineProps(["filename"]);
const emit = defineEmits(["click"]);

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.filename);
};
</script>
  
  <style lang="postcss" scoped>
.imageContainer {
  @apply min-w-32 max-w-40 m-1 p-1 inline static float-start rounded-lg border border-transparent justify-center place-items-center;
  &:hover {
    @apply bg-gray-200 border border-dark_accent;
  }
  &:active {
    @apply border-transparent;
  }
}
.image {
  @apply rounded-lg w-fit;
}
.imageLabel {
  @apply block text-center text-xs overflow-hidden text-wrap;
}
</style>