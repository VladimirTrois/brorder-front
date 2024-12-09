<template>
  <div>
    <h1 class="h1">Commande de pain - Bread Order</h1>
    <h2 class="h2"><DateOfTomorrow /></h2>
    <p>
      Le pain est à récupérer entre 8h30 et 11h.<br />
      <i>Bread is available from 8.30am to 11am</i>
    </p>
    <form class="form" id="breadForm" @submit.prevent="handleFormSubmit">
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
          <div><h4>Your order :</h4></div>
          <div>
            <h5 v-for="item in showItems" :key="item.product.name">
              {{ item.quantity }} x {{ item.product.name }}
            </h5>
          </div>
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
const order = useOrder();
const errors = reactive({
  name: "",
  pitch: "",
  items: "",
});

const closeModal = () => {
  showModal.value = false;
  resetOrder();
};

provide("productsToSell", props.productsToSell);

const isFormValid = () => {
  //check Name
  const regexName = new RegExp("[A-Za-z][A-Za-z0-9_]{1,29}");
  errors.name = !order.value.name
    ? "This field is required."
    : !regexName.test(order.value.name)
    ? "Invalid."
    : "";
  if (errors.name !== "") {
    return false;
  }

  //check Pitch
  const regexPitch = new RegExp("^[A-Za-z][0-9][0-9]$");
  const regexPitchSmall = new RegExp("^[A-Za-z][1-9]$");
  order.value.pitch = regexPitchSmall.test(order.value.pitch)
    ? insertInString(order.value.pitch, 1, "0")
    : order.value.pitch;

  errors.pitch = !order.value.pitch
    ? "This field is required"
    : !regexPitch.test(order.value.pitch)
    ? "Invalid"
    : "";
  if (errors.pitch !== "") {
    return false;
  }

  //check Items
  errors.items = order.value.items.length > 0 ? "" : "This field is required";
  if (errors.items !== "") {
    return false;
  }

  //No errors then form is valid
  return true;
};

async function handleFormSubmit() {
  if (isFormValid()) {
    order.value.pickUpDate = getTomorrowsDateFormatted();
    order.value.items.map((a) => {
      a["product"] = a["@id"];
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/ld+json",
        "content-type": "application/ld+json",
      },
      body: order.value,
    };

    try {
      const response = await $fetch(
        import.meta.env.VITE_API_URL + "/orders",
        requestOptions
      );
      if (response) {
        showItems.value = response.items;
        showModal.value = true;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

function resetOrder() {
  order.value.name = "";
  order.value.pitch = "";
  order.value.items = [];
  order.value.pickUpDate = "";
}
</script>

<style lang="postcss">
.form {
  @apply text-sm md:text-xl lg:text-2xl bg-transparent shadow-md rounded px-2 pt-4 pb-4 mb-4;
}
</style>