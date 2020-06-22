import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        cart: [],
        checkoutStatus: null
    },

    getters: {
        productIsInStock() {
            return (product) => {
                return product.inventory > 0;
            }
        },

        cartProducts(state, getters) {
            return state.cart.map(cartItem => {
                const product = state.products.find(p => p.id === cartItem.id);

                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            });
        },

        cartTotal(state, getters) {
            let total = 0;

            getters.cartProducts.forEach(item => {
                total += item.price * item.quantity
            });

            return total;
        },

        cartIsEmpty(state, getters) {
            return state.cart.length <= 0 ? true : false;
        }
    },

    actions: {
        fetchProducts({ state, commit }) {
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit("setProducts", products);

                    resolve();
                });
            })
        },

        addProductToCart({ state, commit, getters }, product) {
            if (getters.productIsInStock) {
                let cartItem = state.cart.find(p => p.id === product.id);

                if (cartItem) {
                    commit('incrementItemInCart', cartItem);
                } else {
                    commit('pushProductToCart', product.id);
                }

                commit('decrementProductInventory', product);
            }
        },

        checkout({ state, commit, getters }) {

            if (getters.cartIsEmpty) {
                alert('The cart is empty');
            } else {

                return new Promise((resolve, reject) => {
                    shop.buyProducts(
                        state.cart,
                        () => {
                            commit('emptyCart'),
                                commit('setCheckoutStatus', 'success')
                        },
                        () => { commit('setCheckoutStatus', 'fail') }
                    );

                });
            }
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products;
        },

        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            });
        },

        incrementItemInCart(state, cartItem) {
            cartItem.quantity++;
        },

        decrementProductInventory(state, product) {
            product.inventory--;
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        },

        emptyCart(state) {
            state.cart = [];
        }
    }
})