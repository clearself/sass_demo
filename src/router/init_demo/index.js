
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const home = () => import("@/views/init_demo"); //首页
export default new VueRouter({
    base: "/init_demo",
    // mode: "history",
    routes: [
      {
        path: "/",
        name: "init_demo",
        meta: { name: "首页", title: "首页" },
        component: home
      },
    ]
})
