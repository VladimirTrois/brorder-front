import { defineStore } from 'pinia';
import { useAPI } from '~/composables/useAPI';

export const useCollectionOrder = defineStore('collectionOrder', {
  //state
  state: () => ({
    orders: [],
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 50,
    searchByName: null,
    searchByPitch: null,
    date: null,
    isDeleted: false,
    isTaken: null,
    sortBy: 'name',
    sortOrder: 'asc',
    isCollectionFetched: false,
    //stats
    totalOrders: null,
    totalProducts: {},
    totalProductsNotSold: {},
  }),

  getters: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    ordersForCurrentPage() {
      return this.orders[this.currentPage];
    },
    ordersByIsTaken() {
      return this.ordersForCurrentPage.sort((a, b) => a.isTaken - b.isTaken);
    },
    getStats() {
      return {
        totalOrders: this.totalOrders,
        totalProducts: this.totalProducts,
        totalProductsNotSol: this.totalProductsNotSold,
      };
    },
  },

  //actions
  actions: {
    async fetchOrders() {
      const api = useAPI();
      const orderBy = 'order[' + this.sortBy + ']';
      const parameters = {
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        name: this.searchByName,
        'orderBy[name]': this.sortBy === 'name' ? this.sortOrder : null,
        pitch: this.searchByPitch,
        'orderBy[pitch]': this.sortBy === 'pitch' ? this.sortOrder : null,
        'pickUpDate[before]': this.date,
        'pickUpDate[after]': this.date,
        isDeleted: this.isDeleted,
        isTaken: this.isTaken,
      };
      const response = await api.orders.getAll(parameters);
      this.orders[this.currentPage] = response.member;
      this.totalItems = response.totalItems;
    },

    async fetchStats() {
      const api = useAPI();
      const parameters = {
        date: this.date,
      };
      const response = await api.orders.stats(parameters);
      this.totalOrders = response['totalOrders'];
      this.totalProducts = response['totalProducts'].reduce((obj, item) => {
        return {
          ...obj,
          [item.name]: item.count,
        };
      }, {});
      this.totalProductsNotSold = response['totalProductsNotSold'].reduce(
        (obj, item) => {
          return {
            ...obj,
            [item.name]: item.count,
          };
        },
        {},
      );
    },

    setPage(page) {
      this.currentPage = page;
      if (!this.orders[this.currentPage]) {
        this.fetchOrders();
      }
    },
    setFilters(filters) {
      Object.assign(this, filters);
      // Reset to first page when filters change and set orders to empty array
      this.orders = [];
      this.currentPage = 1;
      this.fetchOrders();
    },

    setSort(sortBy) {
      if (this.sortBy === sortBy) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = sortBy;
        this.sortOrder = 'asc';
      }
      // Reset to first page when filters change and set orders to empty array
      this.orders = [];
      this.currentPage = 1;
      this.fetchOrders();
    },

    getOrderQuantityFromProduct(order, product) {
      let quantity = null;
      order.items.forEach((item) => {
        if (item.product.name === product.name) {
          quantity = item.quantity;
        }
      });
      return quantity;
    },
  },
});
