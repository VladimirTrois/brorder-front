<template>
  <div>Pour le {{ dateOfTomorrow }}</div>
</template>

<script setup>
import { getTomorrowString } from "~/functions/date";

const dateOfTomorrow = getTomorrowString();
</script>