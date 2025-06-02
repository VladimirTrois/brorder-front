<template>
  <div>
    <h2 class="mb-2 text-center">Allergies et informations</h2>
    <div class="tableContainer">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Poids</th>
            <th v-for="allergy in allergies.collection" :key="allergy.id">
              {{ allergy.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in collectionProduct.productsFromCurrentPage"
            :key="product.id"
            @click="isPublic ? '' : (singleProduct.product = product)"
          >
            <td class="font-bold">{{ product.name }}</td>
            <td class="text-right">{{ product.weight }}g</td>
            <ProductInfosTableBox
              v-for="allergy in allergies.collection"
              :key="product.id + '.' + allergy.id"
              :productAllergy="getProductAllergy(product, allergy)"
              :product="product"
              @selection="isPublic ? '' : (allergies.selectedAllergy = allergy)"
              @save="handleSubmit"
            />
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isPublic: {
    type: Boolean,
    default: true,
  },
});
const allergies = useAllergies();
const collectionProduct = useCollectionProduct();
const singleProduct = useSingleProduct();

const getProductAllergy = (product, allergy) => {
  if (product.allergies) {
    const productAllergy = product.allergies.find((productAllergy) => {
      return productAllergy.allergy.name == allergy.name;
    });
    if (productAllergy) {
      return productAllergy;
    }
  }
  const newProductAllergy = {
    allergy: allergy,
    level: "Non/No",
  };
  return newProductAllergy;
};

const handleSubmit = async (productAllergy) => {
  if (productAllergy.id) {
    await singleProduct.updateProductAllergies(productAllergy);
  } else {
    singleProduct.product.allergies.push(productAllergy);
    await singleProduct.updateProperties(
      singleProduct.prepareProductAllergies(singleProduct.product),
      ["allergies"]
    );
  }

  const selectedProductId = singleProduct.product.id;
  await collectionProduct.fetchProductsWithAllergies();
  singleProduct.product =
    collectionProduct.productsFromCurrentPage[
      collectionProduct.getProductIndexFromID(selectedProductId)
    ];
};
onMounted(() => {
  singleProduct.product = {};
});
</script>  


<style lang="postcss">
.tableContainer {
  @apply relative flex flex-col w-full h-fit overflow-scroll text-sm md:text-base rounded-lg border-2;
  &:hover {
    @apply border-dark_accent;
  }
}
.table {
  @apply table-auto border-spacing-2 min-w-max overflow-scroll rounded;
}

tbody {
  tr {
    &:hover {
      @apply bg-primary_a10 rounded;
    }
  }
}

th,
td {
  @apply p-2;
}
</style>