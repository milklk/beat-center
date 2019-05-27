<template>
  <div class="container-aside">
    <el-menu :default-active="index" class="el-menu-vertical-demo">
      <router-link to="/home">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">案件</span>
        </template>
        <router-link to="/case-analyze">
          <el-menu-item index="2-1">案件分析</el-menu-item>
        </router-link>
        <router-link to="/case-manage">
          <el-menu-item index="2-2">案件管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">人员</span>
        </template>
        <router-link to="/crew-analyze">
          <el-menu-item index="3-1">人员分析</el-menu-item>
        </router-link>
        <router-link to="/crew-manage">
          <el-menu-item index="3-2">人员管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">情报</span>
        </template>
        <router-link to="/information-analyze">
          <el-menu-item index="4-1">情报分析</el-menu-item>
        </router-link>
        <router-link to="/information-manage">
          <el-menu-item index="4-2">情报管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">情报墙</span>
        </template>
        <router-link to="/combat-wall">
          <el-menu-item index="5-1">打击成效</el-menu-item>
        </router-link>
        <router-link to="/system-wall">
          <el-menu-item index="5-2">系统分析</el-menu-item>
        </router-link>
        <router-link to="/information-wall">
          <el-menu-item index="5-3">情报成效</el-menu-item>
        </router-link>
        <router-link to="/file-wall">
          <el-menu-item index="5-4">一人一档</el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "container-aside",
  data() {
    return {
      index: "1",
      paths: [
        {
          path: "/home",
          index: "1"
        },
        {
          path: "/case-analyze",
          index: "2-1"
        },
        {
          path: "/case-manage",
          index: "2-2"
        },
        {
          path: "/crew-analyze",
          index: "3-1"
        },
        {
          path: "/crew-manage",
          index: "3-2"
        },
        {
          path: "/information-analyze",
          index: "4-1"
        },
        {
          path: "/information-manage",
          index: "4-2"
        },
        {
          path: "/combat-wall",
          index: "5-1"
        },
        {
          path: "/system-wall",
          index: "5-2"
        },
        {
          path: "/information-wall",
          index: "5-3"
        },
        {
          path: "/file-wall",
          index: "5-4"
        }
      ]
    };
  },
  components: {},
  computed: {},
  mounted() {
    const path = this.$route.path;
    const active = this.paths.find(d => d.path === path);
    this.index = active.index;
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>
