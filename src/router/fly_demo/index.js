
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const home = () => import("@/views/fly_demo"); //首页
export default new VueRouter({
    base: "/fly_demo",
    // mode: "history",
    routes: [
      {
        path: "/",
        name: "fly_demo",
        meta: { name: "首页", title: "首页" },
        component: home
      },
    ]
})
