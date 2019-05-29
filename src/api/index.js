import axios from "./axios";

export const Loging = ({ account, password, code }) => axios("/bs/login", { account, password, code }, "post");

export const getCode = () => axios("/bs/getVerificationCode");

export const manageGet = () => axios("/manage");
