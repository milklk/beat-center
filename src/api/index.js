import axios from "./axios";

export const userPost = (user, password) => axios("/user", { user, password }, "post");
