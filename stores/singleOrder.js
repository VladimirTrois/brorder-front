import { defineStore } from 'pinia';
import { useAPI } from '~/composables/useAPI';
import { insertInString } from '~/functions/string';

export const useSingleOrder = defineStore('singleOrder', {
  //state
  state: () => ({
    order: {},
    formErrors: {
      id: '',
      name: '',
      pitch: '',
      pickUpDate: '',
      total: '',
      isTaken: '',
      isDeleted: '',
      items: '',
    },
    existingOrder: {},
  }),
  persist: true,

  getters: {},

  //actions
  actions: {
    newOrder(pickUpDate) {
      let newOrder = new Object();
      newOrder.pickUpdate = pickUpDate;
      newOrder.isTaken = false;
      newOrder.isDeleted = false;
      newOrder.total = 0;
      newOrder.items = [];
      this.order = newOrder;
      this.formErrors = {
        id: '',
        name: '',
        pitch: '',
        pickUpDate: '',
        total: '',
        isTaken: '',
        isDeleted: '',
        items: '',
      };
    },

    async fetch(id) {
      const api = useAPI();
      const response = await api.orders.getOne(id);
      return response;
    },
    async create(order) {
      const newOrder = this.prepareOrder(order);
      const api = useAPI();
      let response = null;
      let error = null;
      try {
        response = await api.orders.create(newOrder);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },
    async update(order, selectedProperties) {
      const updateOrder = this.prepareOrder(order);
      const api = useAPI();
      let response = null;
      let error = null;
      try {
        response = await api.orders.update(
          updateOrder.id,
          updateOrder,
          selectedProperties,
        );
      } catch (e) {
        error = e;
      }
      return { response, error };
    },
    async safeDelete(order) {
      this.order.isDeleted = true;
      const response = await this.updateItem(order);
      return response;
    },
    async deleteFromDB(id) {
      const api = useAPI();
      const response = await api.orders.delete(id);
      return response;
    },

    addProduct(product) {
      let productIndex = this.order.items.findIndex(
        (item) => item.product.name === product.name,
      );
      if (productIndex === -1) {
        this.order.items.push({ product: product, quantity: 1 });
      } else if (
        product.stock < 0 ||
        this.order.items[productIndex].quantity < product.stock
      ) {
        this.order.items[productIndex].quantity++;
      }
    },

    isOrderFormValid() {
      //check Name
      const regexName = /^([à-ü]|[a-z0-9_-]){3,29}$/gi;
      this.formErrors.name = !this.order.name
        ? 'This field is required.'
        : !regexName.test(this.order.name)
        ? 'Invalid.'
        : '';
      if (this.formErrors.name !== '') {
        return false;
      }

      //check Pitch
      const regexPitch = new RegExp('^[A-Za-z][0-9][0-9]$');
      const regexPitchSmall = new RegExp('^[A-Za-z][1-9]$');
      this.order.pitch = regexPitchSmall.test(this.order.pitch)
        ? insertInString(this.order.pitch, 1, '0')
        : this.order.pitch;

      this.formErrors.pitch = !this.order.pitch
        ? 'This field is required'
        : !regexPitch.test(this.order.pitch)
        ? 'Invalid'
        : '';
      if (this.formErrors.pitch !== '') {
        return false;
      }

      //check Items
      this.formErrors.items =
        this.order.items.length > 0 ? '' : 'This field is required';
      if (this.formErrors.items !== '') {
        return false;
      }

      return true;
    },

    prepareOrder(order) {
      const preparedOrder = JSON.parse(JSON.stringify(order));

      //Uppercase pitch
      preparedOrder.pitch = preparedOrder.pitch
        ? preparedOrder.pitch.toUpperCase()
        : null;

      //Lowercase full name
      preparedOrder.name = preparedOrder.name.toLowerCase();

      //Add product field coresponding IRI
      preparedOrder.items.map((a) => {
        a['product'] = a.product['@id'];
      });
      return preparedOrder;
    },
  },
});
