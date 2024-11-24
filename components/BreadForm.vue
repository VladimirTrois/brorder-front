<template>
    <h1 class="h1"> Commande de pain - Bread Order </h1>
    <h2 class="h2"><DateOfTomorrow/></h2>
    <p>Le pain est à récupérer entre 8h30 et 11h.<br>
        <i>Bread is available from 8.30am to 11am</i>
    </p>
    <form class="form" action="" @submit.prevent="">
        <BreadFormInput id="Nom" placeHolder="Nom / Name"/>
        <BreadFormInput id="Pitch" placeHolder="Emplacement / Pitch"/>
        <BreadFormGrid />
        <button class="button">Commander</button>
        
    </form>
</template>

<script setup>
const productsToSell = ref(
    [
        { price:2, name:'Tradition'},
        { price:3, name:'Croissant'},
        { price:1, name:'Test'},
        { price:3, name:'Baguette'},
    ]
)
provide("productsToSell",productsToSell)

const order = useOrder()
</script>

<style lang="postcss">
.form {
    @apply text-sm md:text-xl lg:text-2xl bg-transparent shadow-md rounded px-2 pt-4 pb-4 mb-4;
}
</style>