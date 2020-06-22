<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li
        v-for="product in products"
        :key="product.id"
      >{{ product.title }} - {{ product.price | currency }} ({{ product.quantity }})</li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p>
      <button @click="checkout">Checkout</button>
    </p>
    <p v-if="status">{{ status }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },

    total() {
      return this.$store.getters.cartTotal;
    },

    status() {
      return this.$store.state.status;
    }
  },

  methods: {
    checkout() {
      return this.$store.dispatch("checkout");
    }
  }
};
</script>