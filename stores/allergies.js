import { defineStore } from 'pinia';
import { useAPI } from '~/composables/useAPI';

export const useAllergies = defineStore('allergies', {
  //state
  state: () => ({
    collection: [],
    allergy: {
      name: '',
    },
    formErrors: {
      name: '',
    },
  }),

  //actions
  actions: {
    newAllergy() {
      let newAllergy = new Object();
      newAllergy.name = '';
      this.allergy = newAllergy;
    },

    async fetchAllergies() {
      const api = useAPI();
      const response = await api.allergies.getAll();
      this.collection = response.member;
    },
    async create(allergy) {
      const api = useAPI();
      let response = null;
      let error = null;
      try {
        response = await api.allergies.create(allergy);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },
    async update(allergy) {
      const api = useAPI();
      let response = null;
      let error = null;
      try {
        response = await api.allergies.create(allergy.id, allergy);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },
    async delete(allergy) {
      const api = useAPI();
      let response = null;
      let error = null;
      try {
        response = await api.allergies.delete(allergy.id);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    validateAllergyForm() {
      //check name
      const regexName = /([à-ü]|[a-z0-9_/-\s]){3,29}/gi;
      this.formErrors.name = !this.newAllergy
        ? 'This field is required.'
        : !regexName.test(this.allergy.name)
        ? 'Invalid.'
        : '';
      if (this.formErrors.name !== '') {
        return false;
      }

      return true;
    },
  },
});
