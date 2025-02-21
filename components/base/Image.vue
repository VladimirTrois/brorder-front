<template>
  <img :src="'/file/' + filename" :id="filename" />
</template>

<script setup>
const props = defineProps(["filename"]);
</script>