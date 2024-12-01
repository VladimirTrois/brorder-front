<template>
    <div class="tableContainer">
        <table class="table" style="width:auto">
            <thead>
                <tr>
                    <th scope="col" class="w-4/12 md:w-3/12">Qté</th>
                    <th scope="col" class="w-4/12 md:w-3/12">Produit</th>
                    <th scope="col" class="w-2/12 md:w-3/12">Prix</th>
                </tr>
            </thead>
            <tbody>
                <tr class="trBody" 
                    v-for="(item,index) in order.items.filter((i)=> i.quantity>0)">
                <td class="qte">
                    <FormItemsQuantity :item="item" :index="index"/>
                </td>
                <th scope="row">{{item.name}}</th>
                <td>{{(item.price*item.quantity/100).toFixed(2)}}€</td>
                </tr>
            </tbody>
            <!-- Table footer -->
            <tfoot>
                <tr>
                    <th class="total">
                        <BinSVG 
                            class="iconFooter" v-if="order.items.length>0" alt="delete-basket" loading="lazy" @click="order.items=[]"
                        />
                    </th>
                    <td scope="row" class="">
                        Total:
                    </td>
                    <td>
                        {{totalPrice}}€
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup>
import BinSVG from '@/assets/icons/Bin.vue';
const order = useOrder()

const computeTotal = (arrayOfProduct) => {
    let total=0;
    if(arrayOfProduct){
        for ( const p of arrayOfProduct){
            total+=p.price*p.quantity;
        }
    }
    return (total/100).toFixed(2);
}

const totalPrice= computed(() => computeTotal(order.value.items))


</script>

<style lang="postcss">
.tableContainer {
    @apply min-w-full overflow-x-auto  text-sm md:text-base rounded-lg border-2;
    &:hover{
        @apply border-primary
    }
}
.table{
    @apply text-center
}
thead {
    @apply uppercase tracking-wider
}
tbody{
    @apply mb-10
}
tfoot {
    @apply font-bold bg-transparent border-transparent border-t-8
}
th,td{
    @apply px-2 py-1 text-left
}
.trBody {
    @apply mt-6;
    &:hover{
        @apply bg-gray-200 rounded
    }
}
.qte,.total {
    @apply flex 
}
.totalWritten {
    @apply pl-2
}
.iconFooter{
    path{
        @apply fill-secondary
    }
    @apply text-right w-6 border-2 rounded border-transparent;
    &:hover{
        @apply border-2 border-secondary;
    }
}
</style>