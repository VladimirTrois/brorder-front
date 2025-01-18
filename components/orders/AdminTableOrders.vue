<template>
  <div>
    <div class="tableContainer">
      <table v-if="collectionOrders.totalItems > 0">
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
              class="text-sm max-w-[fit-content] whitespace-nowrap"
              v-for="product in productStore.products[productStore.currentPage]"
              :key="product.name"
            >
              {{ product.name }}
            </th>
            <th>Total</th>
            <!-- Add other columns as needed -->
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
            <td>{{ order.name }}</td>
            <td>{{ order.pitch }}</td>
            <td
              class="text-center"
              v-for="product in productStore.products[productStore.currentPage]"
              :key="order.name + product.name"
            >
              {{ collectionOrders.getOrderQuantityFromProduct(order, product) }}
            </td>
            <td>{{ (order.total / 100).toFixed(2) + "€" }}</td>
            <!-- Add other columns as needed -->
          </tr>
        </tbody>
      </table>
      <div v-else>
        <h2 class="text-center m-4">Pas de commande pour ce jour</h2>
      </div>
    </div>

    <Pagination
      v-if="collectionOrders.totalPages > 1"
      :currentPage="collectionOrders.currentPage"
      :totalPages="collectionOrders.totalPages"
      @pageChange="collectionOrders.setPage(newPage)"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Admin",
});

const collectionOrders = useCollectionOrder();
const singleOrder = useSingleOrder();
const productStore = useCollectionProduct();
const searchTimeout = ref(null);

const route = useRoute();
watch(
  () => route.query,
  () => refreshNuxtData()
);

const updateSearch = (searchByName, searchByPitch) => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    collectionOrders.setFilters({
      searchByName: searchByName,
      searchByPitch: searchByPitch,
    });
  }, 300);
};

const changeDeleteOrder = async (order) => {
  order.isDeleted = !order.isDeleted;
  const response = await singleOrder.update(order, ["isDeleted"]);
};

const gotToEditOrder = async (order) => {
  singleOrder.order = order;
  navigateTo({ path: `/admin/orders/editOrder` });
};

onMounted(() => {
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
  @apply w-full text-left table-auto min-w-max overflow-scroll;
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
tr:nth-child(even) {
  @apply bg-primary_a5;
}
.trBody {
  @apply mt-6;
  &:hover {
    @apply bg-primary_a10 rounded;
  }
}
</style>