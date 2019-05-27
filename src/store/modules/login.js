import { userPost } from "../../api";

const state = {};

const mutations = {};

const actions = {
  async loging({ commit }, { user, password }) {
    const login = await userPost();
    if (login.code === 0) {
      const datas = login.data,
        userNameArr = [],
        passWordArr = [],
        ses = window.sessionStorage;
      for (let i = 0; i < datas.length; i++) {
        userNameArr.push(datas[i].username);
        passWordArr.push(datas[i].password);
      }
      if (userNameArr.indexOf(user) !== -1) {
        const index = userNameArr.indexOf(user);
        if (passWordArr[index] === password) {
          ses.setItem("token", datas[index].token);
          ses.setItem("user", userNameArr[index]);
        }
      }
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
