<template>
  <form class="form" id="breadForm" @submit.prevent="handleFormSubmit">
    <h1 class="h1">Commande de pain - Bread Order</h1>
    <h2 class="h2"><LazyDateOfTomorrow /></h2>
    <p>
      Le pain est à récupérer entre 8h30 et 11h.<br />
      <i>Bread is available from 8.30am to 11am</i>
    </p>
    <Input
      id="name"
      placeHolder="Nom / Name"
      @change="errors.name = ''"
      @focus="errors.name = ''"
      @click="errors.name = ''"
      v-model="order.name"
      :error="errors.name"
    />
    <Input
      id="pitch"
      placeHolder="Emplacement / Pitch"
      @change="errors.pitch = ''"
      @focus="errors.pitch = ''"
      @click="errors.pitch = ''"
      v-model="order.pitch"
      :error="errors.pitch"
    />
    <FormProductGrid id="items" />
    <FormModal id="modal" :show="showModal" @close="closeModal"></FormModal>
    <FormSubmit id="submit" text="Commander" form="breadForm" />
  </form>
</template>

<script setup>
import { getTomorrowsDateFormatted } from "~/functions/date";
import { useProductStore } from "~/stores/ProductStore";
const productStore = useProductStore();
productStore.getProducts();

const showModal = ref(false);
const showItems = ref();
const { resetOrder, loadOrder } = useCreateOrder();
const order = resetOrder();
const errors = reactive({
  name: "",
  pitch: "",
  items: "",
});

const closeModal = () => {
  showModal.value = false;
  //resetOrder();
};

async function handleFormSubmit() {
  showModal.value = true;

  if (useOrder().isFormValid()) {
    order.value.pickUpDate = getTomorrowsDateFormatted();
    order.value.items.map((a) => {
      a["product"] = a["@id"];
    });
    const response = await loadOrder();
    if (response) {
      showItems.value = response.items;
      showModal.value = true;
    }
  }
}
</script>

<style lang="postcss">
.form {
  @apply text-sm md:text-xl lg:text-2xl bg-light_shades shadow-md shadow-primary_mono rounded p-2 md:p-4;
}
</style>