<template>
  <div>
    <h2 class="text-center text-second_a20">
      {{
        selectedDate
          ? "Commande pour le " + getDateWritten(selectedDate)
          : "Select a date"
      }}
    </h2>
    <div class="flex flex-col items-center">
      <Button class="m-2" color="gray" @click="changeDate">{{
        showDatePicker ? "Valider Date" : "Changer date"
      }}</Button>
      <VDatePicker
        v-if="showDatePicker"
        v-model="selectedDate"
        :attributes="attrs"
      >
      </VDatePicker>
    </div>
    <AdminTableOrders />
  </div>
</template>

<script setup>
import { getDateWritten, formatDate, tomorrowDate } from "~/functions/date";
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Commande",
});

const route = useRoute();
watch(
  () => route.query,
  () => refreshNuxtData()
);

const collectionOrders = useCollectionOrder();
const showDatePicker = ref(false);
const selectedDate = ref(tomorrowDate());

collectionOrders.date = formatDate(selectedDate.value);
collectionOrders.isTaken = null;
collectionOrders.isDeleted = null;

const attrs = ref([
  {
    key: "today",
    dates: new Date(),
  },
]);

const changeDate = () => {
  showDatePicker.value = !showDatePicker.value;
  if (!showDatePicker.value) {
    console.log(formatDate(selectedDate.value));
    collectionOrders.setFilters({
      date: formatDate(selectedDate.value),
    });
  }
};
</script>