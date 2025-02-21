<template>
  <div class="flex items-center justify-center m-2 p-2">
    <div class="carrouselImages">
      <ImageCard
        class="imageInCarrousel"
        v-for="imageName in imageList"
        :key="imageName"
        :filename="imageName"
        @click="emit('click', imageName)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["imageList"]);
const emit = defineEmits(["click"]);
</script>

<style lang="postcss">
@media (min-width: 768px) {
  .carrouselImages {
    @apply w-fit bg-primary_a10 rounded-lg grid grid-cols-5;
  }
}

@media (max-width: 768px) {
  .carrouselImages {
    @apply flex overflow-x-auto px-1 -mx-10 snap-x snap-proximity;
  }

  .imageInCarrousel {
    @apply snap-center;
  }
}
</style>