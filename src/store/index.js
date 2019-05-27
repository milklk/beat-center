import Vue from "vue";
import Vuex from "vuex";

import login from "./modules/login";
import manage from "./modules/manage";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    manage
  }
});
