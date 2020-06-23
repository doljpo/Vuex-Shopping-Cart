<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} ({{ product.inventory }})
        <button
          :disabled="!productIsInStock(product)"
          @click="addToCart(product)"
        >Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },

  computed: {
    ...mapState({
      products: state => state.products.items
    }),

    ...mapGetters({
      productIsInStock: "productIsInStock"
    })
  },

  created() {
    this.loading = true;
    this.fetchProducts().then(() => (this.loading = false));
  },

  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
      addToCart: "addProductToCart"
    })
  }
};
</script>