<template>
  <div id="todayOrder">
    <h3 class="text-center">Commandes du {{ currentDate }}</h3>
    <div class="my-2 flex justify-center">
      <ToggleMultiple
        v-model="collectionOrders.isTaken"
        @change="updateFilters"
      ></ToggleMultiple>
    </div>
    <div class="tableContainer">
      <table class="table">
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
              <div
                class="grid grid-cols-2 gap justify-evenly items-center place-items-center"
              >
                <IconButton
                  v-if="order.isTaken"
                  class="p-1 -m-1"
                  size="sm"
                  color="second"
                  name="material-symbols:undo"
                  @click="revertSell(order)"
                />
                <IconButton
                  v-else
                  class="p-1 -m-1"
                  name="tabler:shopping-bag"
                  @click="sellModal(order)"
                />
                <IconButton
                  class="p-1 -m-1"
                  size="sm"
                  name="material-symbols:360"
                  @click="renew(order)"
                />
              </div>
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
            <td class="text-right">{{ (order.total / 100).toFixed(2) }} €</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">Restants:</td>
            <td
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
            </td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">Total Produit:</td>
            <td
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
            </td>
            <td></td>
          </tr>
          <tr
            v-if="
              collectionOrders.totalPages > 1 &&
              productStore.products[productStore.currentPage]
            "
          >
            <td
              :colspan="
                4 + productStore.products[productStore.currentPage].length
              "
            >
              <Pagination
                v-if="collectionOrders.totalPages > 1"
                :currentPage="collectionOrders.currentPage"
                :totalPages="collectionOrders.totalPages"
                @pageChange="collectionOrders.setPage"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <Modal
      :isOpen="isModalOpen"
      :title="modalTitle"
      :content="modalContent"
      :type="modalType"
      @close="closeModal"
      @refresh="refreshPage"
      @replace="editOrder"
      @sell="sell(singleOrder.order)"
      @renew="renew(singleOrder.order)"
    />
  </div>
</template>

<script setup>
import { formatDate, tomorrowDate } from "~/functions/date";
definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Admin",
});

const {
  isModalOpen,
  modalType,
  modalTitle,
  modalContent,
  closeModal,
  openModal,
} = useModal();
const currentDate = useCurrentDate();
const collectionOrders = useCollectionOrder();
const productStore = useCollectionProduct();
const singleOrder = useSingleOrder();
const searchDebounce = ref(null);

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
  openModal("Commande", singleOrder.order, "sellOrder");
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
  singleOrder.newOrderFrom(formatDate(tomorrowDate()), order);
  const { response, error } = await singleOrder.create(singleOrder.order);
  if (response) {
    openModal("Recommandée", response, "showOrder");
  } else {
    if (error.message.includes("already used")) {
      singleOrder.existingOrder = error.data.cause;
      singleOrder.order.id = singleOrder.existingOrder.id;
      openModal(
        "Doublon !",
        [
          "Nom et Emplacement déjà utilisé.",
          singleOrder.existingOrder,
          singleOrder.order,
        ],
        "orderExist"
      );
    } else if (error.message.includes("Not enough stock available")) {
      openModal("Le stock n'est plus disponible", error, "error");
    } else {
      openModal("Erreur", error, "error");
    }
  }
};

const editOrder = async () => {
  if (singleOrder.isOrderFormValid()) {
    const { response, error } = await singleOrder.update(singleOrder.order, [
      "name",
      "isTaken",
      "isDeleted",
      "pitch",
      "pickUpDate",
      "items",
    ]);
    if (response) {
      openModal("Commande modifée.", response, "showOrder");
    } else {
      openModal("Erreur", error, "error");
    }
  }
};

const sell = async () => {
  singleOrder.order.isTaken = true;
  const { response, error } = await singleOrder.update(singleOrder.order, [
    "isTaken",
  ]);
  if (error) {
    openModal("Erreur", error, "error");
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
  collectionOrders.reset();
  collectionOrders.date = formatDate(new Date());
  collectionOrders.isDeleted = false;
  collectionOrders.fetchOrders();
  productStore.fetchProducts();
  collectionOrders.fetchStats();
});
</script>

<style lang="postcss" scoped>
.tableContainer {
  @apply relative flex flex-col w-full h-full overflow-auto md:overflow-visible text-sm md:text-base rounded-lg border-2
  mb-4;
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
  @apply font-bold uppercase bg-primary_mono text-light_shades sticky bottom-0;
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
