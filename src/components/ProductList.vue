<template>
  <div>
    <h1>Product List</h1>
    <img v-if="isLoading" :src="$store.state.loading.animation" />
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
  computed: {
    ...mapState({
      products: state => state.products,
      isLoading: state => state.loading.isLoading
    }),

    ...mapGetters({
      productIsInStock: "productIsInStock"
    })
  },

  created() {
    this.fetchProducts();
  },

  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
      addToCart: "addProductToCart"
    })
  }
};
</script>