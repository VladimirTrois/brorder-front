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
    <div class="md:grid md:grid-cols-5 gap-2">
      <div class="md:col-span-2">
        <OrderFormItemsTable v-if="singleOrder.order.items.length > 0" />
        <p
          v-else
          class="text-center text-xl"
          :class="singleOrder.formErrors.items ? 'text-second' : ''"
        >
          Selectionnez des articles
          <br />
          Choose products
        </p>
        <div
          class="text-second text-center"
          v-if="singleOrder.formErrors.items"
        >
          {{ singleOrder.formErrors.items }}
        </div>
        <Button
          v-if="typeOfForm === 'create' && singleOrder.order.items.length > 0"
          class="mt-3 text-2xl md:text-4xl"
          color="second"
          @click="createOrder"
          >Valider</Button
        >
        <Button
          v-if="typeOfForm === 'edit'"
          class="mt-3 text-2xl md:text-4xl"
          color="primary"
          @click="editOrder"
          >Modifier</Button
        >
      </div>
      <div class="md:col-span-3">
        <LazyProductCarrousel
          v-if="collectionProduct.productsFromCurrentPage"
          :products="
            collectionProduct.productsFromCurrentPage.filter(
              (p) => p.stock !== 0
            )
          "
          @clickProduct="addProduct"
        />
      </div>
    </div>
    <br />
    <Modal
      :isOpen="isModalOpen"
      :title="modalTitle"
      :content="modalContent"
      :type="modalType"
      @close="closeModal"
      @refresh="refresh"
      @replace="editOrder"
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
  modalType,
  modalTitle,
  modalContent,
  closeModal,
  openModal,
} = useModal();
const singleOrder = useSingleOrder();
const collectionProduct = useCollectionProduct();
collectionProduct.isAvailable = true;
collectionProduct.fetchProducts();

const addProduct = (product) => {
  singleOrder.formErrors.items = "";
  singleOrder.addProduct(product);
};

const createOrder = async () => {
  if (singleOrder.isOrderFormValid()) {
    const { response, error } = await singleOrder.create(singleOrder.order);
    if (response) {
      openModal("Commande validée", response, "showOrder");
    } else {
      if (error.message.includes("already used")) {
        singleOrder.formErrors.name = "Le duo existe déjà";
        singleOrder.formErrors.pitch = "Le duo existe déjà";
        singleOrder.existingOrder = error.data.cause;
        singleOrder.order.id = singleOrder.existingOrder.id;
        openModal(
          "Doublon !",
          [
            "Nom et Emplacement déjà utilisé.",
            singleOrder.existingOrder,
            singleOrder.order,
          ],
          "orderExist"
        );
      }
    }
  }
};

const editOrder = async () => {
  if (singleOrder.isOrderFormValid()) {
    const { response, error } = await singleOrder.update(singleOrder.order, [
      "name",
      "isTaken",
      "isDeleted",
      "pitch",
      "pickUpDate",
      "items",
    ]);
    if (response) {
      openModal("Commande modifée.", response, "showOrder");
    } else {
      openModal("Erreur", error, "error");
    }
  }
};

const refresh = () => {
  if (props.typeOfForm === "create") {
    singleOrder.newOrder();
  }
  collectionProduct.fetchProducts();
};

onMounted(() => {
  refresh();
});
</script>

<style lang="postcss">
.form {
  @apply bg-light_shades md:shadow-md shadow-primary_mono rounded md:p-2;
}
</style>