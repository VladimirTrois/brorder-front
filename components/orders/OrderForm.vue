<template>
  <form class="form" id="breadForm" @submit.prevent="">
    <Input
      id="name"
      placeHolder="Nom / Name"
      v-model="singleOrder.order.name"
      :error="singleOrder.formErrors.name"
      :resetError="() => (singleOrder.formErrors.name = '')"
    />
    <Input
      id="pitch"
      placeHolder="Emplacement / Pitch"
      v-model="singleOrder.order.pitch"
      :error="singleOrder.formErrors.pitch"
      :resetError="() => (singleOrder.formErrors.pitch = '')"
    />
    <OrderFormItems />
    <Button
      v-if="typeOfForm === 'create'"
      class="m-2 text-4xl md:text-4xl"
      color="second"
      @click="createOrder"
      >Valider</Button
    >
    <Button
      v-if="typeOfForm === 'edit'"
      class="m-2"
      color="primary"
      @click="editOrder"
      >Modifier</Button
    >
    <br />
    <Modal
      :isOpen="isModalOpen"
      :title="modalTitle"
      :message="modalMessage"
      :color="modalColor"
      @close="closeModal"
    />
  </form>
</template>

<script setup>
const props = defineProps({
  typeOfForm: {
    type: String,
    default: "create",
  },
});
const {
  isModalOpen,
  modalColor,
  modalTitle,
  modalMessage,
  closeModal,
  openModal,
} = useModal();
const singleOrder = useSingleOrder();

const createOrder = async () => {
  if (singleOrder.isOrderFormValid()) {
    const newOrder = JSON.parse(JSON.stringify(singleOrder.order));
    newOrder.items.map((a) => {
      a["product"] = a.product["@id"];
    });
    const { response, error } = await singleOrder.create(newOrder);
    if (response) {
      openModal("Commande validée", response);
    } else {
      if (error.message.includes("already used")) {
        singleOrder.formErrors.name = "Le duo existe déjà";
        singleOrder.formErrors.pitch = "Le duo existe déjà";
        openModal("ERREUR", "Nom et Emplacement déjà utilisé.", "second");
      }
    }
  }
};

const editOrder = async () => {
  if (singleOrder.isOrderFormValid()) {
    const orderUpdate = JSON.parse(JSON.stringify(singleOrder.order));
    orderUpdate.items.map((a) => {
      a["product"] = a.product["@id"];
    });
    const response = await singleOrder.update(orderUpdate, [
      "name",
      "isTaken",
      "isDeleted",
      "pitch",
      "pickUpDate",
      "items",
    ]);
    openModal("Success", "La commande a bien été modifée.");
  }
};
</script>

<style lang="postcss">
.form {
  @apply bg-light_shades md:shadow-md shadow-primary_mono rounded md:p-2;
}
</style>