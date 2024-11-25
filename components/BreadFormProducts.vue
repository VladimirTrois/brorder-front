<template>
    <div class="product" v-for="p in productsToSell" :key="p">
        <NuxtImg 
            class="image"
            :src="p.image" 
            @click="addProduct(p)"
        /><br>
        <label :for="p.name">{{ p.name}}: {{ p.price }}€</label>
    </div>
</template>

<script setup>
const productsToSell = inject("productsToSell")

const order = useOrder()
const addProduct = (product) => {
    let productIndex = order.value.items.findIndex((item) => item.name == product.name)
    if(productIndex === -1){
        product.quantity=1
        order.value.items.push(product)
    }else{
        order.value.items[productIndex].quantity++
    }
}
</script>

<style lang="postcss" scoped>
.product {
    @apply w-28 md:w-32 inline-block px-1 pt-1 pb-1 float-start 
            justify-center place-items-center
}
.image {
    @apply w-full rounded ;
    &:hover {
        @apply bg-gray-300;
    }
}
label {
    @apply block text-center text-sm
}
</style>