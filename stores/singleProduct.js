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
    newAllergy: {},
  }),

  getters: {},

  //actions
  actions: {
    newProduct() {
      let newProduct = new Object();
      newProduct.isAvailable = true;
      this.product = newProduct;
    },

    getProductAllergy(product, allergyName) {
      return product.allergies.find(
        (productAllergy) => productAllergy.allergy.name === allergyName,
      );
    },

    orderProductAllergiesBy(product, allergies) {
      const orderedAllergies = [];
      allergies.forEach((allergy) => {
        let allergyIndex = product.allergies.findIndex(
          (productAllergy) => productAllergy.allergy.name === allergy.name,
        );
        if (allergyIndex)
          orderedAllergies.push(product.allergies.splice(allergyIndex, 1));
      });
      product.allergies = orderedAllergies;
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
    async updateProperties(product, properties) {
      const api = useAPI();
      const response = await api.products.update(
        product.id,
        product,
        properties,
      );
      return response;
    },
    async updateProductAllergies(productAllergy) {
      const preparedProductAllergy = JSON.parse(JSON.stringify(productAllergy));
      const IRI = preparedProductAllergy.allergy['@id'];
      delete preparedProductAllergy.allergy;
      preparedProductAllergy.allergy = IRI;

      const api = useAPI();
      const response = await api.productAllergies.update(
        preparedProductAllergy.id,
        preparedProductAllergy,
      );
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

    prepareProductAllergies(product) {
      const preparedProduct = JSON.parse(JSON.stringify(product));
      preparedProduct.allergies.map((productAllergy, index) => {
        if (productAllergy['@id']) {
          preparedProduct.allergies[index] = productAllergy['@id'];
        } else {
          const IRI = productAllergy.allergy['@id'];
          delete productAllergy.allergy;
          productAllergy.allergy = IRI;
        }
      });
      return preparedProduct;
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
