<template>
  <div class="container-header">
    <h1>禁毒中心</h1>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link" style="color:#fff">
        {{ user }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">首页</el-dropdown-item>
        <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "container-header",
  data() {
    return {
      user: window.sessionStorage.user
    };
  },
  components: {},
  computed: {},
  created() {
    window.sessionStorage.user;
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    }
  }
};
</script>

<style lang="stylus" scoped>
.container-header
  height 100%
  display flex
  justify-content space-between
  align-items center
  h1
    font-size 21px
</style>
