import Vue from "vue";
import Vuex from "vuex";

import signer from "./signer.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    signer,
  },
});
