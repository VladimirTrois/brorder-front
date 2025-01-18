<template>
  <form class="form" id="product" @submit.prevent="handleEditProduct">
    <div class="text-center mb-4">
      Editing : {{ singleProduct.product.name }}
    </div>
    <Toggle class="mb-4" v-model="singleProduct.product.isAvailable">
      {{ singleProduct.product.isAvailable ? "Available" : "Disabled" }}
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
      id="stock"
      placeHolder="Stock"
      type="number"
      v-model="singleProduct.product.stock"
      :error="singleProduct.formErrors.stock"
      :resetError="() => (singleProduct.formErrors.stock = '')"
    />
    <p class="legendStock -mt-3 mb-3">
      (-1 illimité, 0 plus de stock mais affiché dans commande)
    </p>
    <Input
      id="rank"
      placeHolder="Ordre"
      type="number"
      v-model="singleProduct.product.rank"
      :error="singleProduct.formErrors.rank"
      :resetError="() => (singleProduct.formErrors.rank = '')"
    />
    <div class="flex justify-end">
      <IconButton type="submit" color="primary" name="material-symbols:save" />
      <IconButton
        class="ml-4"
        color="second"
        name="material-symbols:delete-forever"
        @click="deleteProduct"
      />
    </div>
  </form>
</template>

<script setup>
const singleProduct = useSingleProduct();
const collectionProduct = useCollectionProduct();

const handleEditProduct = async () => {
  if (singleProduct.validateProductForm()) {
    const response = await singleProduct.update(singleProduct.product);
    console.log(response);
    await collectionProduct.fetchProducts();
  }
};

const deleteProduct = async () => {
  const response = await singleProduct.deleteFromDB(singleProduct.product);
  await collectionProduct.fetchProducts();
};
</script>

<style lang="postcss">
.form {
  @apply text-sm md:text-xl lg:text-2xl bg-light_shades shadow-md shadow-primary_mono rounded p-2 md:p-4;
}
.legendStock {
  @apply text-xs mx-2;
}
</style>