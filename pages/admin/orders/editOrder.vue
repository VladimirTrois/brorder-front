<template>
  <div>
    <IconButton
      color="primary"
      name="material-symbols:arrow-circle-left"
      @click="navigateTo({ path: '/admin/orders' })"
    />
    <div v-if="singleOrder.order.id">
      <h2 class="text-center -mt-8 text-second">
        Commande pour le
        {{ getDateWritten(new Date(singleOrder.order.pickUpDate)) }}
      </h2>
      <OrderForm typeOfForm="edit" />
    </div>
    <div v-else class="flex flex-col items-center">
      <h2 class="m-4 text-center">Merci de selectionné une commande</h2>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Commande",
});
import { getDateWritten } from "~/functions/date";
const singleOrder = useSingleOrder();

console.log(singleOrder.order.id);
</script>