<template>
  <div class="flex items-center justify-center size-fit">
    <label :for="id" class="dropzone">
      <div class="flex flex-col items-center justify-center min-w-32 max-w-40">
        <Icon class="size-8" name="material-symbols:upload-rounded" />
        <p class="mb-2 text-sm font-semibold">Ajouter une image</p>
      </div>
      <input :id="id" type="file" class="hidden" />
    </label>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  file: File,
});
</script>

<style lang="postcss">
.dropzone {
  @apply size-full flex flex-col items-center p-2 text-primary_mono justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100;
}
</style>