<template>
    <div class="productsContainer" v-for="p in productsToSell" :key="p">
        <NuxtImg
            class="productImage"
            :src="p.image" 
            @click="addProduct(p)"
        /><br>
        <label class="productLabel" :for="p.name">{{ p.name}}: {{ (p.price/100).toFixed(2) }}€</label>
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
.productsContainer {
    @apply w-28 md:w-32 inline p-1 static float-start rounded-lg justify-center place-items-center;
    &:hover {
        @apply bg-gray-200 border border-primary;
    }
}
.productImage {
    @apply rounded-lg w-fit;
}
.productLabel {
    @apply block text-center text-sm relative
}
</style>