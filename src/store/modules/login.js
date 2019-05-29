import { Loging } from "../../api";

const state = {};

const mutations = {};

const actions = {
  async loging({ commit }, { account, password, code }) {
    const login = await Loging({ account, password, code });
    if (login.ret === "200") {
      const data = login.data,
        ses = window.sessionStorage;
      ses.setItem("token", data.token);
      ses.setItem("user", account);
    }
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
