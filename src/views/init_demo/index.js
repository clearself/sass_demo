
import Vue from "vue";
import App from "./index.vue";
import router from "@/router/init_demo";
import api from "@/api/init_demo";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

router.afterEach((to) => {
  document.title = to.meta.title;
});

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");
