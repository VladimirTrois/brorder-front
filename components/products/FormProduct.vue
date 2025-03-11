<template>
  <form class="formProduct" id="product" @submit.prevent="handleSubmit">
    <div class="w-full overflow-x-auto px-8">
      <h3 class="w-full text-center inline-block mb-2">
        {{
          typeOfForm === "edit"
            ? `Edition : ${singleProduct.product.name}`
            : `Nouveau Produit`
        }}
      </h3>
    </div>
    <Toggle
      class="mb-2 justify-self-center"
      v-model="singleProduct.product.isAvailable"
    >
      {{ singleProduct.product.isAvailable ? "Actif" : "Inactif" }}
    </Toggle>
    <Input
      id="name"
      placeHolder="Nom / Name"
      v-model="singleProduct.product.name"
      :error="singleProduct.formErrors.name"
      :resetError="() => (singleProduct.formErrors.name = '')"
    />
    <Input
      id="price"
      placeHolder="Prix / Price (cents)"
      type="number"
      v-model="singleProduct.product.price"
      :error="singleProduct.formErrors.price"
      :resetError="() => (singleProduct.formErrors.price = '')"
    />
    <Input
      id="weight"
      placeHolder="Poids / Weight (g)"
      type="number"
      v-model="singleProduct.product.weight"
      :error="singleProduct.formErrors.weight"
      :resetError="() => (singleProduct.formErrors.weight = '')"
    />
    <Input
      id="rank"
      placeHolder="Ordre"
      type="number"
      v-model="singleProduct.product.rank"
      :error="singleProduct.formErrors.rank"
      :resetError="() => (singleProduct.formErrors.rank = '')"
    />
    <Input
      id="stock"
      placeHolder="Stock"
      type="number"
      v-model="singleProduct.product.stock"
      :error="singleProduct.formErrors.stock"
      :resetError="() => (singleProduct.formErrors.stock = '')"
    />
    <p class="legendStock -mt-3 mb-3">(-1 illimité)</p>
    <Input
      id="imagePath"
      placeHolder="Image"
      v-model="singleProduct.product.image"
      :error="singleProduct.formErrors.image"
      :resetError="() => (singleProduct.formErrors.image = '')"
    />
    <div class="flex justify-around">
      <IconButton
        v-if="typeOfForm === 'edit'"
        type="submit"
        color="primary"
        :name="'material-symbols:save'"
      />
      <IconButton
        v-else
        type="submit"
        color="primary"
        :name="'material-symbols:upload-rounded'"
      />
      <!-- <IconButton
          class="ml-4"
          color="second"
          name="material-symbols:delete-forever"
          @click="deleteProduct"
        /> -->
    </div>
  </form>
</template>
  
<script setup>
const props = defineProps(["typeOfForm"]);

const singleProduct = useSingleProduct();
const collectionProduct = useCollectionProduct();

const handleSubmit = async () => {
  if (singleProduct.validateProductForm()) {
    if (singleProduct.product.id) {
      const response = await singleProduct.update(singleProduct.product);
    } else {
      const response = await singleProduct.create(singleProduct.product);
    }
    await collectionProduct.fetchProducts();
  }
};

const deleteProduct = async () => {
  if (
    !confirm(`Are you sure you want to delete ${singleProduct.product.name}?`)
  ) {
    return;
  }
  const response = await singleProduct.deleteFromDB(singleProduct.product);
  await collectionProduct.fetchProducts();
};
</script>
  
  <style lang="postcss">
.formProduct {
  @apply grid justify-items-center w-full max-w-sm md:max-w-full h-fit text-sm md:text-base lg:text-2xl bg-light_shades shadow-md shadow-primary_mono rounded md:p-2;
}
.legendStock {
  @apply text-xs mx-2;
}
</style>