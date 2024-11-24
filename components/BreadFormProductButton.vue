<template>
    <div class="product" v-for="p in products" :key="p">
            <input 
                :id="p.name"
                type="image"
                src="https://picsum.photos/80" 
                :name="p.name"
                :value="p.name"
                :alt="p.name"
                @click="addProduct(p)"
            /><br>
            <label :for="p.name">{{ p.name}}</label>
    </div>
</template>

<script setup>
const props = defineProps({
    products : Array
})

const emits = defineEmits(['choice'])

const addProduct = (product) => {
    emits('choice', product)
}

</script>

<style lang="postcss" scoped>
.product {
    @apply w-24 inline-block px-1 pt-1 pb-1 float-start 
            justify-center place-items-center
}
.input {
    @apply w-full rounded ;
    &:hover {
        @apply bg-gray-300;
    }
}
label {
    @apply block text-center
}
</style>