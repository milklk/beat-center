import Login from "../views/login.vue";
import Home from "../views/home.vue";
import Case from "../views/case.vue"

const routes = [
  {
    path: "/login",
    component: Login,
    meta: {
      loginView: true
    }
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: '/case',
    component: Case
  }
];

export default routes;
