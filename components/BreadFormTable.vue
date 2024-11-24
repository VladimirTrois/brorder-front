<template>
    <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Qté</th>
                    <th scope="col">Produit</th>
                    <th scope="col">Prix</th>
                </tr>
            </thead>
            <tbody>
                <tr class="trBody" v-for="product in products">
                    <td>{{product.quantity}}</td>
                    <th scope="row">{{product.name}}</th>
                    <td>{{product.price}} €</td>
                </tr>
            </tbody>
            <!-- Table footer -->
            <tfoot class="border-t-2 dark:border-neutral-600">
            <tr>
                <th>Total:</th>
                <td > </td>
                <td >{{totalPrice}} €</td>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    products : Array
})

const totalBasket = (arrayOfProduct) => {
    let total=0;
    if(arrayOfProduct){
        for ( const p of arrayOfProduct){
            total+=p.price;
        }
    }
    return total;
}

const totalPrice= computed(() => totalBasket(props.products))


</script>

<style lang="postcss">
.table {
    @apply min-w-full text-left text-sm whitespace-nowrap border-collapse
}
thead {
    @apply uppercase tracking-wider border-b-2 dark:border-neutral-600
}
th,td{
    @apply px-2 py-1
}
.trBody {
    @apply border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600
}
</style>