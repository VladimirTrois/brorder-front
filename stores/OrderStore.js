import { defineStore } from "pinia";

export const useOrderStore = defineStore("OrderStore",{
    //state
    state: () => {
        return {
            orders: [],
        }
    },

    //actions
    actions:{
        async getOrders(){
            this.products = (await useBrorder("/api/orders")).data.value.member;
        }
    }

    //getters
})