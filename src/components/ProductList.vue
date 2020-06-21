<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">{{ product.title }} - {{ product.price }}</li>
    </ul>
  </div>
</template>
<script>
import shop from "@/api/shop";
import store from "@/store/index";

export default {
  computed: {
    products() {
      return store.getters.availableProducts;
    },

    loading() {
      return store.state.loading;
    }
  },
  created() {
    store.dispatch("fetchProducts");
  }
};
</script>