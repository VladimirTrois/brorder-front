<template>
    <h1 class="h1"> Commande de pain - Bread Order </h1>
    <h2 class="h2"><DateOfTomorrow/></h2>
    <p>Le pain est à récupérer entre 8h30 et 11h.<br>
        <i>Bread is available from 8.30am to 11am</i>
    </p>
    <form class="form" action="" @submit.prevent="validateForm">
        <FormInput 
            id="Name" 
            placeHolder="Nom / Name" 
            @change="errors.name=''" 
            @focus="errors.name=''" 
            @click="errors.name=''" 
            v-model="order.name" 
            :error="errors.name"
        />
        <FormInput 
            id="Pitch" 
            placeHolder="Emplacement / Pitch" 
            @change="errors.pitch=''" 
            @focus="errors.pitch=''" 
            @click="errors.pitch=''" 
            v-model="order.pitch" 
            :error="errors.pitch"
        />
        <button class="button" @click="click" type="submit">Commander</button>
        <BreadFormGrid />
    </form>
</template>

<script setup>
import { getTomorrowsDateFormatted } from '~/functions/date';
import { insertInString } from '~/functions/string';

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

const errors = reactive({
    name: '',
    pitch: '',
});

const checkForm = () => {
    //check Name
    const regexName = new RegExp("[A-Za-z][A-Za-z0-9_]{1,29}");
    errors.name = 
        !order.value.name ? 'This field is required.'
        : !regexName.test(order.value.name) ? 'Invalid.'
        : ''

    //check Pitch
    const regexPitch = new RegExp("^[A-Za-z][0-9][0-9]$");
    const regexPitchSmall = new RegExp("^[A-Za-z][1-9]$");
    order.value.pitch = regexPitchSmall.test(order.value.pitch) ? insertInString(order.value.pitch,1,"0"): order.value.pitch;

    errors.pitch = 
        !order.value.pitch ? 'This field is required'
        : !regexPitch.test(order.value.pitch) ? 'Invalid'
        : ''
    
    //check Form
    return (errors.name || errors.pitch) ? false : true;
}
const validateForm = () => {
    if(checkForm()){
        order.value.pickUpDate=getTomorrowsDateFormatted()
        console.log("Form Is Valid")
        console.log(order.value)
    }
}



</script>

<style lang="postcss">
.form {
    @apply text-sm md:text-xl lg:text-2xl bg-transparent shadow-md rounded px-2 pt-4 pb-4 mb-4;
}
</style>