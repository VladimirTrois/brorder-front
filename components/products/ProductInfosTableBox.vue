<template>
  <td
    v-if="productAllergy"
    :class="getOptionForProductAllergy(productAllergy).bg"
  >
    <div
      v-if="
        productAllergy.allergy.name === allergies.selectedAllergy.name &&
        product.name === singleProduct.product.name
      "
      class="flex items-center max-w-fit"
    >
      <select
        :name="productAllergy.id"
        :id="productAllergy.id"
        v-model="productAllergyOption"
        :class="productAllergyOption.bg"
        class="selector"
      >
        <option v-for="option in options" :key="option.label" :value="option">
          {{ option.label }}
        </option>
      </select>
      <IconButton
        v-if="productAllergy.level !== productAllergyOption.value"
        class="ml-2"
        size="sm"
        name="material-symbols:save"
        @click="handleSubmit"
      />
    </div>
    <p
      v-else
      class="flex w-full"
      @click="
        (productAllergyOption = getOptionForProductAllergy(productAllergy)),
          $emit('selection')
      "
    >
      {{ productAllergy.level }}
    </p>
  </td>
</template>

<script setup>
const props = defineProps(["productAllergy", "product"]);
const emit = defineEmits(["selection", "save"]);

const allergies = useAllergies();
const singleProduct = useSingleProduct();
const productAllergyOption = ref({ value: "", label: "", bg: "" });

const options = ref([
  { value: "Oui/Yes", label: "Oui", bg: "bg-red-600" },
  { value: "Non/No", label: "Non", bg: "bg-green-700" },
  {
    value: "Traces possibles/May contain",
    label: "Traces",
    bg: "bg-orange-400",
  },
]);

const getOptionForProductAllergy = (productAllergy) => {
  let level = productAllergy.level;
  if (level.includes("Oui")) {
    return options.value[0];
  } else if (level.includes("Traces")) {
    return options.value[2];
  }
  return options.value[1];
};

const handleSubmit = () => {
  props.productAllergy.level = productAllergyOption.value.value;
  emit("save", props.productAllergy);
};
</script>

<style lang="postcss">
.selector {
  @apply border rounded-lg p-2 w-32 overflow-scroll;
  &:hover {
    @apply border-dark_accent;
  }
}
</style>