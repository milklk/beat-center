import Login from "../views/login.vue";
import Home from "../views/home.vue";
import LawCase from "../views/law-case.vue"

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
    path: '/law-case',
    component: LawCase
  }
];

export default routes;
