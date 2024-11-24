<template>
    <h1 class="h1"> Commande de pain - Bread Order </h1>
    <h2 class="h2"><DateOfTomorrow/></h2>
    <div class="form">
        <p>
            Le pain est à récupérer entre 8h30 et 11h.
            <br>
            <i>Bread is available from 8.30am to 11am</i>
        </p>
        <form action="" @submit.prevent="">
            <fieldset class="grid grid-row-2 gap-2">
                <fieldset class="order">
                    <BreadFormInput id="Nom" placeHolder="Nom / Name"/>
                    <BreadFormInput id="Pitch" placeHolder="Emplacement / Pitch"/>
                    <BreadFormTable :products="products"/>
                    <button class="button">Commander</button>
                </fieldset>
                <fieldset>
                    <BreadFormProductButton :products="availableProducts" @choice="addProduct"/>
                </fieldset>
            </fieldset>
        </form>
    </div>
</template>

<script setup>
const availableProducts = ref(
    [
        { price:2, name:'Tradition'},
        { price:3, name:'Croissant'},
        { price:1, name:'Test'},
        { price:3, name:'Baguette'},
    ]
)
const products = ref(
    [
    ]
)

const addProduct = (p) => {
    console.log(p);
    products.value.push(p);
}

</script>

<style lang="postcss">
.form {
    @apply text-sm md:text-xl lg:text-2xl bg-transparent shadow-md rounded px-2 pt-4 pb-4 mb-4
}
</style>