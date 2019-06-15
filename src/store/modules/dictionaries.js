import { glevelCity,dictionary } from "../../api";

const state = {
  area:[],
  ditionaries: {}
};

const mutations = {
  setArea(state,{area}) {
    state.area = area
  },
  setDitionaries(state,{ditionarie,dicType}) {
    state.ditionaries[dicType] = ditionarie
  }
};

const actions = {
  async getArea({commit},{levelCity}) {
    const level = await glevelCity({levelCity}) 
    const area = level.data;
    commit('setArea',{area})
  },
  async getDitionaries({commit},{dicType}) {
    const dic = await dictionary({dicType})
    const ditionarie = dic.data
    commit('setDitionaries',{ditionarie,dicType})
  }
};

const getters = {
  Area(state) {
    return state.area
  },
  Ditionaries(state) {
    return state.ditionaries
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
