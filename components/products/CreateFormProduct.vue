<template>
  <form class="form" id="product" @submit.prevent="handleCreateProduct">
    <div class="text-center mb-4">
      Creating : {{ singleProduct.product.name }}
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
      <Button class="m-2 start-left" type="submit"> Create </Button>
    </div>
  </form>
</template>

<script setup>
const singleProduct = useSingleProduct();
const collectionProduct = useCollectionProduct();

const handleCreateProduct = async () => {
  if (singleProduct.validateProductForm()) {
    console.log("envoi produit");
    const response = await singleProduct.create(singleProduct.product);
    collectionProduct.fetchProducts();
  }
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