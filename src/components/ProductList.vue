<template>
  <div>
    <h1>Product List</h1>
    <img v-if="isLoading" :src="loadingGif" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }} ({{ product.inventory }})
        <button
          @click="addToCart(product)"
        >Add to cart</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },

    loadingGif() {
      return this.$store.state.loading.animation;
    },

    isLoading() {
      return this.$store.state.loading.isLoading;
    }
  },

  created() {
    this.$store.dispatch("fetchProducts");
  },

  methods: {
    addToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    }
  }
};
</script>