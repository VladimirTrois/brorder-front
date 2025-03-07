import { defineStore } from 'pinia';
import { useAPI } from '~/composables/useAPI';

export const useSingleProduct = defineStore('singleProduct', {
  //state
  state: () => ({
    product: {},
    formErrors: {
      id: '',
      name: '',
      price: '',
      weight: '',
      isAvailable: '',
      stock: '',
      image: '',
      rank: '',
    },
  }),

  getters: {},

  //actions
  actions: {
    newProduct() {
      let newProduct = new Object();
      newProduct.isAvailable = true;
      this.product = newProduct;
    },

    async fetch(id) {
      const api = useAPI();
      const response = await api.products.getOne(id);
      return response;
    },
    async create(product) {
      const api = useAPI();
      const response = await api.products.create(product);
      return response;
    },
    async update(product) {
      const api = useAPI();
      const response = await api.products.update(product.id, product, [
        'name',
        'price',
        'weight',
        'isAvailable',
        'stock',
        'image',
        'rank',
      ]);
      return response;
    },
    async safeDelete(product) {
      product.isDeleted = true;
      const response = await this.updateItem(product);
      return response;
    },
    async deleteFromDB(product) {
      const api = useAPI();
      const response = await api.products.delete(product.id);
      return response;
    },
    validateProductForm() {
      //check name
      const regexName = /([à-ü]|[a-z0-9_-\s]){3,29}/gi;
      this.formErrors.name = !this.product.name
        ? 'This field is required.'
        : !regexName.test(this.product.name)
        ? 'Invalid.'
        : '';
      if (this.formErrors.name !== '') {
        return false;
      }
      //check price
      const regexPrice = new RegExp('^[0-9]{1,29}$');
      this.formErrors.price = !this.product.price
        ? 'This field is required.'
        : !regexPrice.test(this.product.price)
        ? 'Invalid.'
        : '';
      if (this.formErrors.price !== '') {
        return false;
      }
      //check weight
      const regexWeight = new RegExp('^[0-9]{1,29}$');
      this.formErrors.weight = !this.product.weight
        ? 'This field is required.'
        : !regexWeight.test(this.product.weight)
        ? 'Invalid.'
        : '';
      if (this.formErrors.weight !== '') {
        return false;
      }
      //check stock
      const regexStock = new RegExp('^-1|[0-9]{1,29}$');
      this.formErrors.stock =
        this.product.stock === null
          ? 'This field is required.'
          : !regexStock.test(this.product.stock)
          ? 'Invalid.'
          : '';
      if (this.formErrors.stock !== '') {
        return false;
      }
      //check rank
      const regexRank = new RegExp('^[0-9]{1,29}$');
      this.formErrors.rank =
        this.product.rank === null
          ? 'This field is required.'
          : !regexRank.test(this.product.rank)
          ? 'Invalid.'
          : '';
      if (this.formErrors.rank !== '') {
        return false;
      }

      return true;
    },
  },
});
