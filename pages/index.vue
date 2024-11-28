<template>

    <span v-if="status==='pending'">Loading...</span>
  
    <span v-else-if="data">
        <Form :productsToSell=data.member />
    </span>
  
    <span v-else-if="error">Error: {{ error }}</span>
    <br/>
    <button @click="refresh">Refresh</button>
  
  </template>

<script setup>
const api = "https://localhost/"

const { data, status, error, refresh, clear } = await useFetch(api+"products?page=1")

console.log(data.value)

</script>