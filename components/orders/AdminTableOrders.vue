<template>
  <div>
    <div class="tableContainer">
      <table>
        <div v-if="collectionOrders.totalItems === 0">
          <h2 class="text-center">Pas de commande</h2>
        </div>
        <thead class="thead">
          <tr class="trHead">
            <th></th>
            <th>
              <input
                class="w-32 rounded-lg bg-transparent border-2 border-transparent hover:border-light_shades"
                v-model="collectionOrders.searchByName"
                type="text"
                @input="updateSearch($event.target.value, null)"
                placeholder="Search"
              />
              <br />
              <div @click="collectionOrders.setSort('name')">
                Name
                <span v-if="collectionOrders.sortBy === 'name'">
                  {{ collectionOrders.sortOrder === "asc" ? "▲" : "▼" }}
                </span>
              </div>
            </th>
            <th>
              <input
                class="w-20 rounded-lg bg-transparent border-2 border-transparent hover:border-light_shades"
                type="text"
                v-model="collectionOrders.searchByPitch"
                @input="updateSearch(null, $event.target.value)"
                placeholder="Search"
              />
              <div @click="collectionOrders.setSort('pitch')">
                Pitch
                <span v-if="collectionOrders.sortBy === 'pitch'">
                  {{ collectionOrders.sortOrder === "asc" ? "▲" : "▼" }}
                </span>
              </div>
            </th>
            <th
              class="rotate"
              v-for="product in productStore.products[productStore.currentPage]"
              :key="product.name"
            >
              <div>
                <span>
                  {{ product.name }}
                </span>
              </div>
            </th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="trBody"
            v-for="order in collectionOrders.ordersForCurrentPage"
            :key="order.id"
          >
            <td class="flex justify-evenly cursor-pointer">
              <IconButton
                color="primary"
                size="sm"
                name="material-symbols:edit-document"
                @click="gotToEditOrder(order)"
              />
              <IconButton
                color="second"
                size="sm"
                :name="order.isDeleted ? 'ci:redo' : 'material-symbols:delete'"
                @click="changeDeleteOrder(order)"
              />
            </td>
            <td>
              {{
                order.name[0].toUpperCase() + order.name.slice(1).toLowerCase()
              }}
            </td>
            <td>{{ order.pitch }}</td>
            <td
              class="text-center"
              v-for="product in productStore.products[productStore.currentPage]"
              :key="order.name + product.name"
            >
              {{ collectionOrders.getOrderQuantityFromProduct(order, product) }}
            </td>
            <td class="text-right">
              {{ (order.total / 100).toFixed(2) + "€" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      class="mt-2 mb-4"
      v-if="collectionOrders.totalPages > 1"
      :currentPage="collectionOrders.currentPage"
      :totalPages="collectionOrders.totalPages"
      @pageChange="collectionOrders.setPage"
    />
  </div>
</template>

<script setup>
const collectionOrders = useCollectionOrder();
const singleOrder = useSingleOrder();
const productStore = useCollectionProduct();
const searchTimeout = ref(null);

const route = useRoute();
watch(
  () => route.query,
  () => refreshNuxtData(),
  () => collectionOrders.reset()
);

const updateSearch = (searchByName, searchByPitch) => {
  //prepare name search
  const nameSearch = searchByName ? searchByName.toLowerCase() : null;

  //prepare pitch search
  const pitchSearch = searchByPitch ? searchByPitch.toUpperCase() : null;

  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    collectionOrders.setFilters({
      searchByName: nameSearch,
      searchByPitch: pitchSearch,
    });
  }, 800);
};

const changeDeleteOrder = async (order) => {
  order.isDeleted = !order.isDeleted;
  const { response, error } = await singleOrder.update(order, ["isDeleted"]);
  if (error) {
    order.isDeleted = !order.isDeleted;
  }
};

const gotToEditOrder = async (order) => {
  singleOrder.order = order;
  navigateTo({ path: `/admin/orders/editOrder` });
};

onMounted(() => {
  collectionOrders.reset();
  productStore.isAvailable = true;
  productStore.fetchProducts();
  collectionOrders.fetchOrders();
  collectionOrders.fetchStats();
});
</script>

<style lang="postcss" scoped>
.tableContainer {
  @apply relative flex flex-col w-full h-full overflow-auto md:overflow-visible text-sm md:text-base rounded-lg border-2;
  &:hover {
    @apply border-dark_accent;
  }
}
table {
  @apply w-full text-left table-auto min-w-max overflow-scroll max-h-screen;
}
table tr:first-child th:first-child {
  @apply rounded-t-lg;
}
thead {
  z-index: 2;
  @apply uppercase bg-primary_mono text-light_shades sticky top-0;
}
th,
td {
  @apply px-2 py-1;
}
.trHead {
  @apply align-bottom;
}
tbody tr:nth-child(even) {
  @apply bg-primary_a5;
}
.trBody {
  @apply mt-6 md:text-lg;
  &:hover {
    @apply bg-primary_a10 rounded;
  }
}

th.rotate {
  /* Something you can count on */
  @apply text-sm whitespace-nowrap h-28 w-20;
}

th.rotate div {
  @apply -rotate-45 w-4 translate-y-1;
}
th.rotate div span {
  padding: 5px 10px;
}
</style>