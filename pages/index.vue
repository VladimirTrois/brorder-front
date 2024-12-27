<template>
  <div>
    <div class="text-left ml-5">
      <h1>Commande de pain</h1>
      <h2 class="">Pour le {{ getDateWritten(tomorrowDate()) }}</h2>
      <p class="m-1">
        Le pain est à récupérer entre 8h30 et 11h<br />
        <i>Bread is available from 8.30am to 11am</i>
      </p>
    </div>
    <OrderForm type-of-form="create" />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Commande",
});
import { getDateWritten, tomorrowDate, formatDate } from "~/functions/date";

const singleOrder = useSingleOrder();
singleOrder.newOrder(formatDate(tomorrowDate()));
</script>