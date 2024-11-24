<template>
    <table class="itemsTable" style="width:100%">
        <thead>
            <tr>
                <th scope="col" style="width:40%">Qté</th>
                <th scope="col" style="width:50%">Produit</th>
                <th scope="col" style="width:10%">Prix</th>
            </tr>
        </thead>
        <tbody>
            <tr class="trBody" 
                v-for="(item,index) in order.items.filter((i)=> i.quantity>0)">
                <td class="qte">
                    <BreadFormItemsQuantity :item="item" :index="index"/>
                </td>
                <th scope="row">{{item.name}}</th>
                <td>{{item.price * item.quantity}} €</td>
            </tr>
        </tbody>
        <!-- Table footer -->
        <tfoot>
        <tr>
            <th class="total">
                <NuxtImg class="image" v-if="order.items.length>0" src="/img/bin.svg" alt="delete-basket" loading="lazy" @click="order.items=[]"/> 
            </th>
            <td scope="row">Total:</td>
            <td>{{totalPrice}} €</td>
        </tr>
        </tfoot>
    </table>
</template>

<script setup>
const order = useOrder()

const computeTotal = (arrayOfProduct) => {
    let total=0;
    if(arrayOfProduct){
        for ( const p of arrayOfProduct){
            total+=p.price*p.quantity;
        }
    }
    return total;
}

const totalPrice= computed(() => computeTotal(order.value.items))


</script>

<style lang="postcss">
.itemsTable {
    @apply min-w-full text-left text-sm whitespace-nowrap rounded border-2
}
thead {
    @apply uppercase tracking-wider
}
tfoot {
    @apply mt-20 pt-2 border-t-2 text-secondary font-bold border-primary bg-gray-100
}
th,td{
    @apply px-2 py-1
}
.trBody {
    @apply mt-6
}
.qte,.total {
    @apply flex 
}
.totalWritten {
    @apply pl-2
}
</style>