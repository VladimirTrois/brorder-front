<template>
    Pour le {{ dateOfTomorrow }} 
</template>

<script setup>
import { getTomorrowString } from '~/functions/date';

const dateOfTomorrow = getTomorrowString()
</script>