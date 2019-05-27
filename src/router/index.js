import Vue from "vue";
import Router from "vue-router";

import routes from "./routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (window.sessionStorage.token) {
    if (to.path === "/") {
      next({ path: "/home" });
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});
export default router;
