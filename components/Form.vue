<template>
  <div>
    <h1 class="h1">Commande de pain - Bread Order</h1>
    <h2 class="h2"><DateOfTomorrow /></h2>
    <p>
      Le pain est à récupérer entre 8h30 et 11h.<br />
      <i>Bread is available from 8.30am to 11am</i>
    </p>
    <form class="form" id="breadForm">
      <Input
        id="Name"
        placeHolder="Nom / Name"
        @change="errors.name = ''"
        @focus="errors.name = ''"
        @click="errors.name = ''"
        v-model="order.name"
        :error="errors.name"
      />
      <Input
        id="Pitch"
        placeHolder="Emplacement / Pitch"
        @change="errors.pitch = ''"
        @focus="errors.pitch = ''"
        @click="errors.pitch = ''"
        v-model="order.pitch"
        :error="errors.pitch"
      />
      <FormGrid />
      <FormSubmit text="Commander" form="breadForm" />
    </form>
    <Teleport to="body">
      <ModalDialog :show="showModal" @close="closeModal()">
        <template #header>
          <h3>Success</h3>
        </template>
        <template #body>
          <h4>Your order :</h4>
          <h5 v-for="item in showItems" :key="item.product.name">
            {{ item.quantity }} x {{ item.product.name }}
          </h5>
        </template>
      </ModalDialog>
    </Teleport>
  </div>
</template>

<script setup>
import { getTomorrowsDateFormatted } from "~/functions/date";
import { insertInString } from "~/functions/string";

const showModal = ref(false);
const showItems = ref();

const props = defineProps({
  productsToSell: Object,
});
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

provide("productsToSell", props.productsToSell);

async function handleFormSubmit() {
  if (isFormValid()) {
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
  @apply text-sm md:text-xl lg:text-2xl bg-transparent shadow-md rounded px-2 pt-4 pb-4 mb-4;
}
</style>