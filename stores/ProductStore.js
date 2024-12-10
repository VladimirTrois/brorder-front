import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore",{
    //state
    state: () => {
        return {
            products: [],
        }
    },

    //actions
    actions:{
        async getProducts(){
            this.products = (await useBrorder("/api/products")).data.value.member;
        }
    }

    //getters
})