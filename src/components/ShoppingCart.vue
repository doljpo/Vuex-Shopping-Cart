<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul class="cart-items">
      <li
        v-for="product in products"
        :key="product.id"
      >{{ product.title }} - {{ product.price | currency }} ({{ product.quantity }})</li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <button class="button primary" @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),

    ...mapGetters({
      products: "cartProducts",
      total: "cartTotal"
    })
  },

  methods: {
    ...mapActions(["checkout"])
  }
};
</script>
<style scoped>
.cart-items {
  list-style: none;
}
</style>