const tmp = (project) => {
  return `
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const home = () => import("@/views/${project}"); //首页
export default new VueRouter({
    base: "/${project}",
    // mode: "history",
    routes: [
      {
        path: "/",
        name: "${project}",
        meta: { name: "首页", title: "首页" },
        component: home
      },
    ]
})
`;
};

module.exports = tmp;
