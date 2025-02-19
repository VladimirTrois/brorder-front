<template>
  <div id="todayOrder">
    <h2 class="text-center">Commandes du {{ currentDate }}</h2>

    <div class="my-2 flex justify-center">
      <ToggleMultiple
        v-model="collectionOrders.isTaken"
        @change="updateFilters"
      ></ToggleMultiple>
    </div>
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
                <span class="text-xl" v-if="collectionOrders.sortBy === 'name'">
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
            <td>
              <IconButton
                class="-m-1"
                v-if="order.isTaken"
                color="second"
                name="material-symbols:undo"
                @click="revertSell(order)"
              />
              <IconButton
                v-else
                class="p-1 -m-1"
                name="material-symbols:shopping-cart-checkout"
                @click="sellModal(order)"
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
            <td class="text-right">{{ (order.total / 100).toFixed(2) }} €</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td class="text-right">Restants:</td>
            <th
              class="text-center"
              v-for="product in productStore.products[productStore.currentPage]"
              :key="product.name"
            >
              <div>
                <span>
                  {{
                    collectionOrders.totalProductsNotSold[product.name]
                      ? collectionOrders.totalProductsNotSold[product.name]
                      : 0
                  }}</span
                >
              </div>
            </th>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="text-right">Total Produit:</td>
            <th
              class="text-center"
              v-for="product in productStore.products[productStore.currentPage]"
              :key="product.name"
            >
              <div>
                <span>
                  {{
                    collectionOrders.totalProducts[product.name]
                      ? collectionOrders.totalProducts[product.name]
                      : 0
                  }}</span
                >
              </div>
            </th>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <Pagination
      v-if="collectionOrders.totalPages > 1"
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
      @sell="sell(singleOrder.order)"
      @renew="renew(singleOrder.order)"
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

import { formatDate, tomorrowDate } from "~/functions/date";

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
  //prepare name search
  const nameSearch = searchByName
    ? searchByName[0].toUpperCase() + searchByName.slice(1).toLowerCase()
    : null;

  //prepare pitch search
  const pitchSearch = searchByPitch ? searchByPitch.toUpperCase() : null;

  clearTimeout(searchDebounce.value);
  searchDebounce.value = setTimeout(() => {
    collectionOrders.setFilters({
      searchByName: nameSearch,
      searchByPitch: pitchSearch,
    });
  }, 800);
};

const updateFilters = () => {
  collectionOrders.setFilters({
    isDeleted: collectionOrders.isDeleted,
    isTaken: collectionOrders.isTaken,
  });
};

const sellModal = (order) => {
  singleOrder.order = order;
  openModal("À vendre");
};

const revertSell = async (order) => {
  singleOrder.order = order;
  order.isTaken = !order.isTaken;
  const { response, error } = await singleOrder.update(order, ["isTaken"]);
  if (response) {
    refreshPage();
  }
};

const renew = async (order) => {
  let newOrder = new Object();
  newOrder.name = order.name;
  newOrder.pitch = order.pitch;
  newOrder.total = order.total;
  console.log(order.items);
  newOrder.items = JSON.parse(JSON.stringify(order.items));
  console.log(newOrder.items);
  newOrder.pickUpDate = formatDate(tomorrowDate());
  newOrder.items.map((a) => {
    a["product"] = a.product["@id"];
  });
  console.log(newOrder);
  const { response, error } = await singleOrder.create(newOrder);
  if (error) {
    openModal("Erreur", error);
  }
  refreshPage();
};

const sell = async () => {
  singleOrder.order.isTaken = true;
  const { response, error } = await singleOrder.update(singleOrder.order, [
    "isTaken",
  ]);
  if (error) {
    openModal("Erreur", error);
  }
  refreshPage();
};

const refreshPage = async () => {
  collectionOrders.date = formatDate(new Date());
  collectionOrders.fetchOrders();
  productStore.fetchProducts();
  collectionOrders.fetchStats();
};

onMounted(() => {
  collectionOrders.date = formatDate(new Date());
  collectionOrders.isDeleted = false;
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
  @apply w-full text-left table-auto max-h-screen;
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
