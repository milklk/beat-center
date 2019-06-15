import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./plugins/element/element.js";
import "./plugins/mock";
import "./plugins/echarts";
import "./plugins/reset.css";
import "./plugins/element/element.css";
import "./assets/iconfont/iconfont.css";




Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");