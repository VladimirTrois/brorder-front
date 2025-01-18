<template>
  <div>
    <h2 class="text-center">Commandes du {{ currentDate }}</h2>
    <div>
      <div class="my-2 flex justify-center">
        <ToggleMultiple
          v-model="collectionOrders.isTaken"
          @change="updateFilters"
        ></ToggleMultiple>
      </div>
      <div class="tableContainer">
        <table>
          <thead class="thead">
            <tr class="trHead">
              <th>Etat</th>
              <th>
                <input
                  class="w-36 outline-none rounded-lg bg-primary_mono border-2 border-transparent hover:border-light_shades focus:border-primary"
                  v-model="collectionOrders.searchByName"
                  type="text"
                  @input="updateSearch($event.target.value, null)"
                  placeholder="Search by name"
                />
                <br />
                <div
                  class="hover:text-primary"
                  @click="collectionOrders.setSort('name')"
                >
                  Name
                  <span
                    class="text-xl"
                    v-if="collectionOrders.sortBy === 'name'"
                  >
                    {{ collectionOrders.sortOrder === "asc" ? "▲" : "▼" }}
                  </span>
                </div>
              </th>
              <th>
                <input
                  class="w-36 outline-none rounded-lg bg-primary_mono border-2 border-transparent hover:border-light_shades focus:border-primary"
                  type="text"
                  v-model="collectionOrders.searchByPitch"
                  @input="updateSearch(null, $event.target.value)"
                  placeholder="Search by pitch"
                />
                <div
                  class="hover:text-primary"
                  @click="collectionOrders.setSort('pitch')"
                >
                  Pitch
                  <span
                    class="text-xl"
                    v-if="collectionOrders.sortBy === 'pitch'"
                  >
                    {{ collectionOrders.sortOrder === "asc" ? "▲" : "▼" }}
                  </span>
                </div>
              </th>
              <th
                class="rotate"
                v-for="product in productStore.products[
                  productStore.currentPage
                ]"
                :key="product.name"
              >
                <div>
                  <span>
                    {{ product.name }}
                  </span>
                </div>
              </th>
              <th class="text-right">Total</th>
              <!-- Add other columns as needed -->
            </tr>
          </thead>
          <tbody>
            <tr
              class="trBody"
              v-for="order in collectionOrders.ordersForCurrentPage"
              :key="order.id"
            >
              <td>
                <IconButton
                  class="-m-1"
                  v-if="order.isTaken"
                  color="second"
                  name="material-symbols:undo"
                  @click="sell(order)"
                />
                <IconButton
                  v-else
                  class="p-1 -m-1"
                  name="material-symbols:shopping-cart-checkout"
                  @click="sell(order)"
                />
              </td>
              <td>{{ order.name }}</td>
              <td>{{ order.pitch }}</td>
              <td
                class="text-center"
                v-for="product in productStore.products[
                  productStore.currentPage
                ]"
                :key="order.name + product.name"
              >
                {{
                  collectionOrders.getOrderQuantityFromProduct(order, product)
                }}
              </td>
              <td class="text-right">{{ (order.total / 100).toFixed(2) }} €</td>
              <!-- Add other columns as needed -->
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td class="text-right">Total Produit:</td>
              <th
                class="text-center"
                v-for="product in productStore.products[
                  productStore.currentPage
                ]"
                :key="product.name"
              >
                <div>
                  <span>
                    {{ collectionOrders.totalProducts[product.name] }}</span
                  >
                </div>
              </th>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td class="text-right">Restants:</td>
              <th
                class="text-center"
                v-for="product in productStore.products[
                  productStore.currentPage
                ]"
                :key="product.name"
              >
                <div>
                  <span>
                    {{
                      collectionOrders.totalProductsNotSold[product.name]
                    }}</span
                  >
                </div>
              </th>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      {{ singleOrder.order }}
      <Pagination
        :currentPage="collectionOrders.currentPage"
        :totalPages="collectionOrders.totalPages"
        @pageChange="collectionOrders.setPage"
      />
      <OrderModal
        :isOpen="isModalOpen"
        :title="modalTitle"
        :message="modalMessage"
        :order="singleOrder.order"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Admin",
});

import { formatDate } from "~/functions/date";

const { isModalOpen, modalTitle, modalMessage, closeModal, openModal } =
  useModal();
const currentDate = useCurrentDate();
const collectionOrders = useCollectionOrder();
const productStore = useCollectionProduct();
const singleOrder = useSingleOrder();
const searchDebounce = ref(null);

const route = useRoute();
watch(
  () => route.query,
  () => refreshNuxtData()
);

const updateSearch = (searchByName, searchByPitch) => {
  clearTimeout(searchDebounce.value);
  searchDebounce.value = setTimeout(() => {
    collectionOrders.setFilters({
      searchByName: searchByName,
      searchByPitch: searchByPitch,
    });
  }, 300);
};

const updateFilters = () => {
  collectionOrders.setFilters({
    isDeleted: collectionOrders.isDeleted,
    isTaken: collectionOrders.isTaken,
  });
};

const sell = async (order) => {
  singleOrder.order = order;
  order.isTaken = !order.isTaken;
  const { response, error } = await singleOrder.update(order, ["isTaken"]);
  if (order.isTaken && response) {
    openModal("Success", response);
  }
};

onMounted(() => {
  collectionOrders.date = formatDate(new Date());
  collectionOrders.fetchOrders();
  productStore.fetchProducts();
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
  @apply w-full text-left table-auto min-w-max;
}
table tr:first-child th:first-child {
  @apply rounded-t-lg;
}
thead {
  z-index: 2;
  @apply uppercase bg-primary_mono text-light_shades sticky top-0;
}
tfoot {
  @apply uppercase bg-primary_mono text-light_shades sticky bottom-0;
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
  @apply mt-6;
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
