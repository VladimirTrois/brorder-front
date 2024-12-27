import { defineStore } from 'pinia';
import { useAPI } from '~/composables/useAPI';

export const useCollectionProduct = defineStore('collectionProduct', {
  //state
  state: () => ({
    products: [],
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 20,
    searchByName: null,
    isAvailable: null,
    searchByStock: null,
    sortBy: 'rank',
    sortOrder: 'asc',
    isCollectionFetched: false,
  }),

  getters: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    productsFromCurrentPage() {
      return this.products[this.currentPage];
    },
  },

  //actions
  actions: {
    async fetchProducts() {
      this.isCollectionFetched = false;
      const api = useAPI();
      const response = await api.products.getAll({
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        name: this.searchByName,
        isAvailable: this.isAvailable,
        stock: this.searchByStock,
        ['orderBy[' + this.sortBy + ']']: this.sortOrder,
      });

      this.products[this.currentPage] = response.member;
      this.totalItems = response.totalItems;
      this.isCollectionFetched = true;
    },
    setPage(page) {
      this.currentPage = page;
      if (!this.products[this.currentPage]) {
        this.fetchProducts();
      }
    },
    setFilters(filters) {
      Object.assign(this, filters);
      // Reset to first page when filters change and set Products to empty array
      this.products = [];
      this.currentPage = 1;
      this.fetchProducts();
    },

    setSort(sortBy) {
      if (this.sortBy === sortBy) {
        this.products = this.products === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = sortBy;
        this.products = 'asc';
      }
      // Reset to first page when filters change and set Products to empty array
      this.products = [];
      this.currentPage = 1;
      this.fetchProducts();
    },

    async fetchTodayProducts(page = 1) {
      let date = new Date();
      date = date.toISOString().split('T')[0];
      const api = useAPI();
      const response = await api.Products.getAllForDate(date, page);
      this.products = response.member;
      this.totalItems = response.totalItems;
      this.currentPage = page;
    },

    async getProducts() {
      let date = new Date();
      date = date.toISOString().split('T')[0];
      this._privateGetEntity('/Products', date);
    },
    async getProductById(id) {
      let date = new Date();
      date = date.toISOString().split('T')[0];
      this._privateGetEntity(`/Products/${id}`, date);
    },

    async _privateGetEntity(url, date) {
      const { $api } = useNuxtApp();
      this.loading = true;
      this.error = null;
      try {
        const response = await $api(url, {
          query: {
            'pickUpDate[before]': date,
            'pickUpDate[after]': date,
          },
        });
        this.Products = response.member;
      } catch (error) {
        this.error = 'Failed to fetch entities';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
