<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else class="d-flex flex-justify-around product-list">
      <li v-for="product in products" :key="product.id" class="product-list-item">
        <div class="product-image">
          <img src="./../assets/img/vuex-logo.png" />
        </div>
        <div class="product-info">
          <div>{{ product.title }}</div>
          <div class="mt-16p mb-16p">
            <span>{{ product.price | currency }}</span>
          </div>
          <div class="mb-16p">Item description...</div>
          <div class="pt-16p">
            <button
              :disabled="!productIsInStock(product)"
              class="button success"
              @click="addToCart(product)"
            >
              <span>Add to cart</span>
              <span class="mif-add-shopping-cart"></span>
            </button>
          </div>
        </div>
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
<style scoped>
.product-list {
  flex-flow: row wrap;
}

.product-list-item {
  list-style: none;
  height: 240px;
}

.product-image {
  float: left;
  width: 200px;
  border: 1px solid #0a0a0a17;
}
.product-image img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}
.product-image:hover img {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

.product-info {
  margin-left: 216px;
  text-align: start;
}

.mt-16p {
  margin-top: 16px;
}

.mb-16p {
  margin-bottom: 16px;
}

.pt-16p {
  padding-top: 16px;
}
</style>