import Mock from "mockjs";

import manage from "./mock-jsons/manage.json";

Mock.mock("/manage", {code: 0, data: manage});
