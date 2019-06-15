<template>
  <nav>
    <div>
      <el-tag
        class="tab"
        v-for="(tab, index) in tabs"
        closable
        :disable-transitions="disable"
        @close="handleClose(index, tab)"
        @click="pushTag(index, tab)"
        :type="$route.path !== tab.path ? 'info' : ''"
        :key="index"
      >{{ tab.name }}</el-tag>
    </div>
    <div>
      <el-dropdown @command="tabsExit">
        <span class="el-dropdown-link tab">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="allExit">关闭所有</el-dropdown-item>
          <el-dropdown-item command="elseExit" divided>关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "tab",
  data() {
    return {
      disable: true
    };
  },
  components: {},
  computed: {
    ...mapGetters("nav", {
      tabs: "Tabs",
      paths: "Paths"
    })
  },
  mounted() {
    const path = this.$route.path;
    const active = this.paths
      .map(d => d.paths)
      .flat()
      .find(d => d.path === path);
    this.$store.commit("nav/setTabs", {
      tab: { ...active },
      type: "find"
    });
  },
  methods: {
    handleClose(index, tab) {
      const path = this.$route.path;
      if (path === tab.path) {
        if (this.tabs.length - 1 !== 0 && index === this.tabs.length - 1) {
          const tab = this.tabs[index - 1];
          this.$router.push({ path: tab.path });
          this.$store.commit("nav/setIndex",{index:tab.index});
          this.tabs.splice(index, 1);
        } else if (this.tabs.length - 1 !== 0) {
          const tab = this.tabs[index + 1];
          this.$router.push({ path: tab.path });
          this.$store.commit("nav/setIndex",{index:tab.index});
          this.tabs.splice(index, 1);
        } else {
          this.$router.push({ path: "/home" });
          this.$store.commit("nav/setTabs", {
            tab: {
              path: "/home",
              name: "首页",
              index: "1"
            },
            type: "find"
          });
          this.$store.commit("nav/setIndex",{index: "1"});
        }
      } else {
         this.tabs.splice(index, 1);
      }
    },
    pushTag(index, tab) {
      this.$router.push({ path: tab.path });
      this.$store.commit("nav/setIndex",{index:tab.index});
    },
    tabsExit(command) {
      switch (command) {
        case "allExit":
          this.$store.commit("nav/setTabs", {
            tab: {
              path: "/home",
              name: "首页",
              index: "1"
            },
            type: "find"
          });
          this.$router.push({ path: "/home" });
          this.$store.commit("nav/setIndex",{index: "1"});
          break;
        default:
          const path = this.$route.path;
          const active = this.paths
            .map(d => d.paths)
            .flat()
            .find(d => d.path === path);
          this.$store.commit("nav/setTabs", {
            tab: { ...active },
            type: "find"
          });
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
nav {
  box-sizing: border-box;
  background: #ffffff;
  width: 100%;
  margin-bottom: 20px;
  min-height: 50px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tab {
    cursor: pointer;
  }
}
</style>
