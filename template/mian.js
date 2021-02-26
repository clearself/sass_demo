const temp = (project) => {
  return `
import Vue from "vue";
import App from "./index.vue";
import router from "@/router/${project}";
import api from "@/api/${project}";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

router.afterEach((to) => {
  document.title = to.meta.title;
});

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");
`;
};

module.exports = temp;
