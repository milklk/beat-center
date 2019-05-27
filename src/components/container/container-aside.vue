<template>
  <div class="container-aside">
    <el-menu default-active="1" class="el-menu-vertical-demo">
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
        <router-link to="">
          <el-menu-item index="2-1">案件分析</el-menu-item>
        </router-link>
        <router-link to="/case">
          <el-menu-item index="2-2">案件管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">人员</span>
        </template>
        <router-link to="">
          <el-menu-item index="3-1">人员分析</el-menu-item>
        </router-link>
        <router-link to="">
          <el-menu-item index="3-2">人员管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">情报</span>
        </template>
        <router-link to="">
          <el-menu-item index="4-1">情报分析</el-menu-item>
        </router-link>
        <router-link to="">
          <el-menu-item index="4-2">情报管理</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">情报墙</span>
        </template>
        <router-link to="">
          <el-menu-item index="5-1">打击成效</el-menu-item>
        </router-link>
        <router-link to="">
          <el-menu-item index="5-2">系统分析</el-menu-item>
        </router-link>
        <router-link to="">
          <el-menu-item index="5-3">情报成效</el-menu-item>
        </router-link>
        <router-link to="">
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
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="stylus" scoped></style>
