import axios from "./axios";

export const userPost = (user, password) => axios("/user", { user, password }, "post");
export const manageGet = (token) => axios('/manage');
