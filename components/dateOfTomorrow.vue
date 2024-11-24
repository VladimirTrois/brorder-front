<template>
    Pour le {{ dateOfTomorrow }} 
</template>

<script setup>
import { tomorrowString } from '~/composable/date';

const dateOfTomorrow = computed(() => tomorrowString())
</script>