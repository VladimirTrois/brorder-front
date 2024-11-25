<template>
    <h1 class="h1"> Commande de pain - Bread Order </h1>
    <h2 class="h2"><DateOfTomorrow/></h2>
    <p>Le pain est à récupérer entre 8h30 et 11h.<br>
        <i>Bread is available from 8.30am to 11am</i>
    </p>
    <form class="form" action="" @submit.prevent="validateForm">
        <BreadFormInput id="Nom" placeHolder="Nom / Name" v-model="order.name"/>
        <BreadFormInput id="Pitch" placeHolder="Emplacement / Pitch" v-model="order.pitch"/>
        <button class="button" @click="click" type="submit">Commander</button>
        <BreadFormGrid />
    </form>
</template>

<script setup>
import { getTomorrowsDateFormatted } from '~/functions/date';

const productsToSell = ref(
    [
        { price:2, name:'Tradition', weight: 150, image:'/img/products/tradition.png'},
        { price:3, name:'Croissant', weight: 50, image:'/img/products/croissant.png'},
        { price:1, name:'Pain au Chocolat', weight: 50, image:'/img/products/painauchocolat.png'},
        { price:3, name:'Baguette', weight: 250, image:'/img/products/baguette.jpg'},
    ]
)
provide("productsToSell",productsToSell)

const order = useOrder()

const validateForm = () => {
    order.value.pickUpDate=getTomorrowsDateFormatted()
    console.log(order.value)
}
</script>

<style lang="postcss">
.form {
    @apply text-sm md:text-xl lg:text-2xl bg-transparent shadow-md rounded px-2 pt-4 pb-4 mb-4;
}
</style>