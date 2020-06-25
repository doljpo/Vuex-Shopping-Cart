<template>
  <div id="app" style="margin-top: 0px;">
    <PageHeader />
    <ProductList />
    <hr />
    <ShoppingCart />
  </div>
</template>

<script>
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import PageHeader from "./components/PageHeader";

export default {
  name: "app",
  components: {
    ProductList,
    ShoppingCart,
    PageHeader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
