<template>
  <div
    style="background-color: #dedcdc; padding: 0 10rem; min-height: 5rem;"
    class="product-list-service d-flex flex-wrap flex-justify-center mb-4 flex-align-center"
  >
    <div class="row flex-align-center flex-justify-between">
      <img class="scaled" src="./../assets/images/application/vue-logo.png" />
      <h4>Vuex Shopping Cart</h4>
    </div>
    <div class="ml-auto d-flex flex-wrap flex-justify-around">
      <div class="list-view-as d-flex flex-align-around ml-4">
        <div class="d-flex flex-align-center" style="padding: 1rem;">
          <span style="font-size: 2rem; padding-right: 5px;" class="mif-cart"></span>
          <span style="font-size: 1.5rem;">({{ cartQuantity }})</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      cartQuantity: "cartProductsQuantity"
    })
  }
};
</script>

<style scoped>
.scaled {
  transform: scale(0.7);
}
</style>