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

        addProductToCart(context, product) {
            if (product.inventory <= 0) {
                alert('Item out of stock')
            } else {
                let cartItem = context.state.cart.find(p => p.productId === product.id);

                if (cartItem) {
                    context.commit('incrementItemInCart', cartItem);
                } else {
                    context.commit('addProductToCart', product.id);
                }

                context.commit('decrementItemInventory', product);
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

        addProductToCart(state, productId) {
            state.cart.push({
                productId: productId,
                quantity: 1
            })
        },

        incrementItemInCart(state, product) {
            product.quantity++
        },

        decrementItemInventory(state, product) {
            product.inventory--
        }
    }
})