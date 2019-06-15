const state = {
  paths: [
    {
      type: {
        name: "首页",
        icon: "el-icon-s-home"
      },
      paths: [
        {
          path: "/home",
          name: "首页",
          index: "1"
        }
      ]
    },
    {
      type: {
        name: "案件",
        icon: "el-icon-s-order"
      },
      paths: [
        {
          path: "/case-analyze",
          name: "案件分析",
          index: "2-1"
        },
        {
          path: "/case-manage",
          name: "案件管理",
          index: "2-2"
        }
      ]
    },
    {
      type: {
        name: "人员",
        icon: "el-icon-user-solid"
      },
      paths: [
        {
          path: "/crew-analyze",
          name: "人员分析",
          index: "3-1"
        },
        {
          path: "/crew-manage",
          name: "人员管理",
          index: "3-2"
        }
      ]
    },
    {
      type: {
        name: "情报",
        icon: "el-icon-s-data"
      },
      paths: [
        {
          path: "/information-analyze",
          name: "情报分析",
          index: "4-1"
        },
        {
          path: "/information-manage",
          name: "情报管理",
          index: "4-2"
        }
      ]
    },
    {
      type: {
        name: "情报墙",
        icon: "el-icon-s-marketing"
      },
      paths: [
        {
          path: "/wall-analyze",
          name: "情报墙分析",
          index: "5-1"
        },
        {
          path: "/wall-config",
          name: "情报墙图表",
          index: "5-2"
        },
        {
          path: "/wall-data",
          name: "情报墙数据",
          index: "5-3"
        }
      ]
    }
  ],
  tabs: [],
  index: "1"
};

const mutations = {
  setTabs(state, { tab, type }) {
    switch (type) {
      case "push":
        state.tabs.push(tab);
        break;
      case "all":
        state.tabs = [];
        break;
      case "find":
        state.tabs = [tab];
        break;
      default:
        break;
    }
  },
  setIndex(state,{index}) {
    state.index = index
  }
};

const actions = {};

const getters = {
  Tabs(state) {
    return state.tabs;
  },
  Paths(state) {
    return state.paths;
  },
  Index(state) {
    return state.index
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
