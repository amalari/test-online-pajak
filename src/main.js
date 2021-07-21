import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import ApiService from "./services";
import store from "./store";
import { VueMaskDirective } from "v-mask";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Vue.config.productionTip = false;

ApiService.init();

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.directive("mask", VueMaskDirective);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
