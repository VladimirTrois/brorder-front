<template>
  <div class="tableContainer">
    <table class="table" style="width: auto">
      <thead>
        <tr>
          <th scope="col" class="w-5/12 md:w-5/12">Qté</th>
          <th scope="col" class="w-5/12 md:w-5/12">Produit</th>
          <th scope="col" class="w-2/12 md:w-2/12 text-right">Prix</th>
        </tr>
      </thead>
      <tbody v-if="singleOrder.order.items" class="mb-10">
        <tr
          v-for="(item, index) in singleOrder.order.items.filter(
            (i) => i.quantity > 0
          )"
          class="trBody"
          :key="item.name"
          :id="item.name"
        >
          <td>
            <FormItemsQuantity :item="item" :index="index" />
          </td>
          <th scope="row">{{ item.product.name }}</th>
          <td class="text-right">
            {{ (item.product.price / 100).toFixed(2) }}€
          </td>
        </tr>
      </tbody>
      <!-- Table footer -->
      <tfoot>
        <tr>
          <td class="text-lg md:text-xl">
            <SvgoBin
              class="binFooter ml-3"
              v-if="singleOrder.order.items.length > 0"
              alt="delete-basket"
              loading="lazy"
              @click="singleOrder.order.items = []"
            />
          </td>
          <th class="text-base text-right" scope="row">Total:</th>
          <td class="text-base text-right">
            {{ (singleOrder.order.total / 100).toFixed(2) }}€
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
const singleOrder = useSingleOrder();

const computeTotal = (arrayOfItems) => {
  let total = 0;
  if (arrayOfItems) {
    for (const p of arrayOfItems) {
      total += p.product.price * p.quantity;
    }
  }
  return total;
};

singleOrder.order.total = computed(() => computeTotal(singleOrder.order.items));
</script>

<style lang="postcss">
.tableContainer {
  @apply relative flex flex-col w-full h-full overflow-x-scroll text-sm md:text-base rounded-lg border-2;
  &:hover {
    @apply border-dark_accent;
  }
}
.table {
  @apply w-full text-left;
}
thead {
  @apply uppercase tracking-wider;
}
tfoot {
  @apply border-t-8 border-transparent;
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
  @apply h-full border border-transparent rounded text-dark_shades;
  &:hover {
    @apply bg-dark_shades text-white;
  }
  &:active {
    @apply bg-white text-dark_shades;
  }
}
</style>