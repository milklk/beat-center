import Vue from "vue";
import Vuex from "vuex";

import manage from "./modules/manage";
import nav from "./modules/nav";
import dictionaries from "./modules/dictionaries"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    manage,
    nav,
    dictionaries
  }
});
