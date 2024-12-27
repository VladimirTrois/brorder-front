<template>
  <div>
    <h2 v-if="selectedDate" class="text-center text-second_a20">
      {{ "Statistique du " + getDateWritten(selectedDate) }}
    </h2>
    <h2 v-else class="text-center text-second_a20">Select a date"</h2>
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
      <div
        v-if="collectionOrders.getStats"
        class="mt-5 md:mt-20 rounded-lg w-full flex flex-row justify-evenly items-center text-center"
      >
        <h2 class="bg-primary_mono rounded-xl p-10 text-light_shades">
          {{ collectionOrders.totalOrders }}
          <br />
          Commandes
        </h2>
        <div class="text-left">
          <div
            v-for="(total, name) in collectionOrders.totalProducts"
            :key="name"
          >
            <h3>{{ total }} {{ name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Stats",
});

import { getDateWritten, formatDate, tomorrowDate } from "~/functions/date";
const showDatePicker = ref(false);
const selectedDate = ref(tomorrowDate());
const collectionOrders = useCollectionOrder();

const attrs = ref([
  {
    key: "today",
    dates: new Date(),
  },
]);

onMounted(() => {
  collectionOrders.date = formatDate(selectedDate.value);
  collectionOrders.fetchStats();
});

const changeDate = async () => {
  showDatePicker.value = !showDatePicker.value;
  if (!showDatePicker.value) {
    collectionOrders.date = formatDate(selectedDate.value);
    collectionOrders.fetchStats();
  }
};
</script>