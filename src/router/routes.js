import Login from "../views/login.vue";
import Home from "../views/home.vue";
import caseAnalyze from "../views/case/case-analyze.vue";
import caseManage from "../views/case/case-manage.vue";
import crewAnalyze from "../views/crew/crew-analyze.vue";
import crewManage from "../views/crew/crew-manage.vue";
import informationAnalyze from "../views/information/information-analyze.vue";
import informationManage from "../views/information/information-manage.vue";
import wallAnalyze from "../views/wall/wall-analyze.vue";
import wallManage from "../views/wall/wall-manage.vue";

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
    path: "/case-analyze",
    component: caseAnalyze
  },
  {
    path: "/case-manage",
    component: caseManage
  },
  {
    path: "/crew-analyze",
    component: crewAnalyze
  },
  {
    path: "/crew-manage",
    component: crewManage
  },
  {
    path: "/information-analyze",
    component: informationAnalyze
  },
  {
    path: "/information-manage",
    component: informationManage
  },
  {
    path: "/wall-analyze",
    component: wallAnalyze
  },
  {
    path: "/wall-manage",
    component: wallManage
  }
];

export default routes;
