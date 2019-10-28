import Vue from "vue";

import { Plugin as Fragment } from "vue-fragment";

import store from "@Store/Store";

import RootComponent from "./RootComponent.vue";


(function executeApplication(): void {

  Vue.use(Fragment);

  new Vue({
    el: "#Application",
    store,
    template: "<RootComponent />",
    components: { RootComponent }
  });
})();
