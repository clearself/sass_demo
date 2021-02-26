
import Vue from "vue";
import App from "./index.vue";
import router from "@/router/fly_demo";
import api from "@/api/fly_demo";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

let obj = {
	arrs:{
		age:15
	},
	name:'wcxdsa'
}

console.log(obj?.arrs?.age)
router.afterEach((to) => {
  document.title = to.meta.title;
});

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");
