<template>
  <form class="form" id="breadForm" @submit.prevent="handleFormSubmit">
    <h1>Commande de pain - Bread Order</h1>
    <h2><LazyDateOfTomorrow /></h2>
    <p>
      Le pain est à récupérer entre 8h30 et 11h.<br />
      <i>Bread is available from 8.30am to 11am</i>
    </p>
    <Input
      id="name"
      placeHolder="Nom / Name"
      v-model="order.name"
      :error="formErrors.name"
      :resetError="() => (formErrors.name = '')"
    />
    <Input
      id="pitch"
      placeHolder="Emplacement / Pitch"
      v-model="order.pitch"
      :error="formErrors.pitch"
      :resetError="() => (formErrors.pitch = '')"
    />
    <LazyFormProductGrid id="items" />
    <FormSubmit id="submit" text="Commander" form="breadForm" />
    <Modal
      :isOpen="isModalOpen"
      :title="modalTitle"
      :message="modalMessage"
      @close="closeModal"
    />
  </form>
</template>

<script setup>
import { useModal } from "~/composables/useModal";
import { useOrder } from "~/composables/useOrder";
const { isModalOpen, modalTitle, modalMessage, closeModal, openModal } =
  useModal();

// const showModal = ref(false);
// const showItems = ref();
const { resetOrder, loadOrder } = useCreateOrder();
const order = resetOrder();
const formErrors = reactive({
  name: "",
  pitch: "",
  items: "",
});

// const closeModal = () => {
//   showModal.value = false;
//   //resetOrder();
// };

async function handleFormSubmit() {
  openModal("Success", "Test");
  // if (useOrder().isFormValid()) {
  //   order.value.pickUpDate = getTomorrowsDateFormatted();
  //   order.value.items.map((a) => {
  //     a["product"] = a["@id"];
  //   });
  //   const response = await loadOrder();
  //   if (response) {
  //     openModal("Success", response.items);
  //   }
  // }
}
</script>

<style lang="postcss">
.form {
  @apply text-sm md:text-xl lg:text-2xl bg-light_shades shadow-md shadow-primary_mono rounded p-2 md:p-4;
}
</style>