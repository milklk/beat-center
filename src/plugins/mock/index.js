import Mock from "mockjs";
import user from "./mock-jsons/login.json";
import manage from "./mock-jsons/manage.json";

Mock.mock("/user", "post", user);
Mock.mock("/manage", {code: 0, data: manage});
