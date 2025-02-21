<template>
  <div>
    <IconButton
      color="primary"
      name="material-symbols:arrow-circle-left"
      @click="navigateTo({ path: '/admin/products' })"
    />
    <h1 class="text-center">Gestion des images</h1>
    <div class="flex items-center justify-center gap-4">
      <form class="m-4" @submit.prevent="">
        <InputFile id="image" @change="handleFileChange" :file="image" />
      </form>
      <div class="m-4 flex items-center justify-around">
        <Image
          v-if="selectedImage"
          class="border rounded w-28 md:w-36"
          :filename="selectedImage"
          alt="Chosen Image"
        />
        <IconButton
          v-if="selectedImage"
          color="second"
          name="material-symbols:delete-forever"
          @click="
            deleteImage(selectedImage);
            selectedImage = null;
          "
        />
      </div>
    </div>
    <h2 class="mb-2 text-center">Images disponibles :</h2>
    <ImagesView v-if="images" :imageList="images" @click="handleSelectImage" />
  </div>
</template>

<script setup>
import ImagesView from "~/components/products/ImagesView.vue";

definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Images",
});

// Reactive references
const image = ref(null);
const selectedImage = ref("");

const { images, fetchImages, postImage, deleteImage } = useImages();

const handleSelectImage = (image) => {
  selectedImage.value = image;
};

// Handle file selection
const handleFileChange = (event) => {
  image.value = event.target.files[0];
  handleSubmit();
};

// Handle form submission
const handleSubmit = async () => {
  if (!image.value) {
    alert("Please select an image.");
    return;
  }

  const uploadedFileName = await postImage(image.value);

  const formData = new FormData();
  formData.append("image", image.value);
  selectedImage.value = uploadedFileName; // Store the uploaded image path
  fetchImages();
};

// Load images on page load
onMounted(() => {
  fetchImages();
});
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
    @apply min-w-32 snap-center;
  }
}
</style>