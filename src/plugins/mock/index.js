import Mock from "mockjs";
import user from "./mock-jsons/login.json";

Mock.mock("/user", "post", user);
