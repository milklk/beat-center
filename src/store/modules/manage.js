import {manageGet} from '../../api'

const state = {
  tags: [],
  tableData: []
}

const mutations = {
  setTags (state, {tag,type}) {
    switch (type) {
      case 'push':
        state.tags.push(tag)
        break;
      case 'all':
        state.tags = []
        break;
      case 'find':
          state.tags = [tag]
          break;
      default:
        break;
    }
  },
  getTableData(state, {tableData}) {
    state.tableData = tableData
  },
  initTags (state) {
    state.tags = []
  },
  elseTags(state,{tag}){
    state.tags = state.tags.find(tag)
  }
}

const actions = {
  async getManage({commit},id) {
    const table = await manageGet(window.sessionStorage.token)
    if (table.code === 0) {
      const tableData = table.data
      commit('getTableData',{tableData})
      if (id) {
        const tag = tableData.find((d) => id === d.id)
        commit('setTags',{tag,type:'find'})
      }
    }
  }
}

const getters = {
  gtableData(state) {
    return state.tableData
  },
  gtags(state) {
    return state.tags
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}