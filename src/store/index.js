import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: []
    },

    getters: {
        availableProducts(state, getters) {
            return state.products.filter(p => p.inventory > 0);
        }
    },

    actions: {

    },

    mutations: {
        setProducts(state, products) {
            state.products = products;
        }
    }
})