<template>
  <div class="content-inner h-100 container-fluid">
    <h1>Product List</h1>
    <div class="product-list-wrapper m-3">
      <div class="list-component">
        <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
        <ul v-else class="product-list view-as-list">
          <li v-for="product in products" :key="product.id" class="product-list-item">
            <div class="product-image" style="border: 1px solid black">
              <img src="./../assets/img/vuex_logo_01.png" />
            </div>
            <div style="text-align: start;" class="product-title">{{ product.title }}</div>
            <div style="text-align: start;" class="product-price">
              <span class="current-price" data-format="money">{{ product.price | currency }}</span>
            </div>
            <div
              style="text-align: start"
              class="product-desc"
            >Advanced Features Shopify Theme Get the latest fashion tips and outfit ideas from your favorite celebrities and designers. Click through runway and front row photos from fashion week shows in...</div>
            <div style="text-align: start;" class="product-actions">
              <button
                :disabled="!productIsInStock(product)"
                class="button success"
                @click="addToCart(product)"
              >
                <span class="mif-add-shopping-cart"></span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
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
  margin: 10px 0 0;
  padding: 24px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  background-color: white;
  position: relative;
}
.product-list .product-list-item {
  position: relative;
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  flex-shrink: 0;
  max-width: calc(100% - 16px);
  margin: 20px 8px;
}
.product-list .product-list-item .product-image {
  width: 100%;
  height: auto;
  overflow: hidden;
  order: 1;
}
.product-list .product-list-item .product-image img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}
.product-list .product-list-item .product-image:hover img {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}
.product-list .product-list-item .product-title {
  order: 2;
  font-size: 16px;
  margin: 8px 0 4px;
}
.product-list .product-list-item .product-price {
  order: 3;
  margin: 4px 0 8px;
  font-weight: bold;
  font-size: 18px;
}
.product-list.view-as-list .product-list-item {
  display: block;
  height: 240px;
}
.product-list.view-as-list .product-image {
  float: left;
  width: 200px;
}
.product-list.view-as-list .product-title,
.product-list.view-as-list .product-price,
.product-list.view-as-list .product-desc,
.product-list.view-as-list .product-actions {
  margin-left: 216px;
}
.product-list.view-as-list .product-price {
  margin-top: 16px;
  margin-bottom: 16px;
}
.product-list.view-as-list .product-desc {
  display: block;
  margin-top: 16px;
  margin-bottom: 16px;
}
.product-list.view-as-list .product-actions {
  border-top: 1px solid #ebebeb;
  padding-top: 16px;
}
</style>