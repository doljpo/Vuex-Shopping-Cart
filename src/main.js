import Vue from 'vue';
import App from './App';
import store from "@/store/index";
import { currency } from './filters/currency'
import 'metro4/build/css/metro-all.css';
import 'metro4/build/js/metro.js';

Vue.config.productionTip = false;
Vue.filter('currency', currency);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  mounted() {
    Metro.Init();
  }
});
