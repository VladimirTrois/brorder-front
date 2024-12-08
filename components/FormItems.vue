<template>
  <div class="tableContainer">
    <table class="table" style="width: auto">
      <thead>
        <tr>
          <th scope="col" class="w-4/12 md:w-3/12">Qté</th>
          <th scope="col" class="w-4/12 md:w-3/12">Produit</th>
          <th scope="col" class="w-2/12 md:w-3/12">Prix</th>
        </tr>
      </thead>
      <tbody class="mb-10">
        <tr
          class="trBody"
          v-for="(item, index) in order.items.filter((i) => i.quantity > 0)"
          :key="item.name"
        >
          <td>
            <FormItemsQuantity :item="item" :index="index" />
          </td>
          <th scope="row">{{ item.name }}</th>
          <td>{{ ((item.price * item.quantity) / 100).toFixed(2) }}€</td>
        </tr>
      </tbody>
      <!-- Table footer -->
      <tfoot>
        <tr>
          <td class="px-6 py-3 text-lg md:text-xl">
            <SvgoBin
              class="binFooter"
              v-if="order.items.length > 0"
              alt="delete-basket"
              loading="lazy"
              @click="order.items = []"
            />
          </td>
          <th class="px-6 py-3 text-base" scope="row">Total:</th>
          <td class="px-6 py-3 text-base">{{ totalPrice }}€</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import BinSVG from "@/assets/icons/Bin.vue";
const order = useOrder();

const computeTotal = (arrayOfProduct) => {
  let total = 0;
  if (arrayOfProduct) {
    for (const p of arrayOfProduct) {
      total += p.price * p.quantity;
    }
  }
  return (total / 100).toFixed(2);
};

const totalPrice = computed(() => computeTotal(order.value.items));
</script>

<style lang="postcss">
.tableContainer {
  @apply relative flex flex-col w-full h-full overflow-scroll text-sm md:text-base rounded-lg border-2;
  &:hover {
    @apply border-primary;
  }
}
.table {
  @apply w-full text-left table-auto min-w-max;
}
thead {
  @apply uppercase tracking-wider;
}
th,
td {
  @apply px-2 py-1 text-left;
}
.trBody {
  @apply mt-6;
  &:hover {
    @apply bg-gray-200 rounded;
  }
}
.totalWritten {
  @apply pl-2;
}
.binFooter {
  @apply h-full border border-transparent rounded text-secondary;
  &:hover {
    @apply bg-secondary text-white;
  }
  &:active {
    @apply bg-white text-secondary;
  }
}
</style>