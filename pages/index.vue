<template>
  <div>
    <h1>Commande de pain</h1>
    <h2 class="md:m-2">Pour le {{ getDateWritten(tomorrowDate()) }}</h2>
    <p class="md:ml-2">
      Le pain est à récupérer entre 8h30 et 11h<br />
      <i>Bread is available from 8.30am to 11am</i>
    </p>
    <OrderForm typeOfForm="create" />
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