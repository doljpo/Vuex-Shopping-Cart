import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        loading: false
    },

    getters: {
        availableProducts(state, getters) {
            return state.products.filter(p => p.inventory > 0);
        }
    },

    actions: {
        fetchProducts({ state, commit }) {
            commit("setIsLoading", true);

            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit("setProducts", products);
                    commit("setIsLoading", false);

                    resolve();
                });
            })
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products;
        },

        setIsLoading(state, loading) {
            state.loading = loading;
        }
    }
})