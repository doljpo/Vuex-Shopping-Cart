import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        cart: [],
        loading: {
            animation: "https://i.imgur.com/JfPpwOA.gif",
            isLoading: false
        }
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
        },

        addProductToCart({ state, commit }, product) {
            if (product.inventory <= 0) {
                alert('Item out of stock')
            } else {
                let cartItem = state.cart.find(p => p.productId === product.id);

                if (cartItem) {
                    commit('incrementItemInCart', cartItem);
                } else {
                    commit('pushProductToCart', product.id);
                }

                commit('decrementProductInventory', product);
            }
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products;
        },

        setIsLoading(state, isLoading) {
            state.loading.isLoading = isLoading;
        },

        pushProductToCart(state, productId) {
            state.cart.push({
                productId: productId,
                quantity: 1
            })
        },

        incrementItemInCart(state, cartItem) {
            cartItem.quantity++
        },

        decrementProductInventory(state, product) {
            product.inventory--
        }
    }
})