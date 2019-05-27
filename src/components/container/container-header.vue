<template>
  <div class="container-header">
    <h1>禁毒中心</h1>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ user }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/home">
          <el-dropdown-item command="home">首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item command="exit" divided>退出登录</el-dropdown-item>
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
      switch (command) {
        case "home":
          this.$router.push({ path: "/home" });
          break;

        default:
          this.$router.push({ path: "/login" });
          window.sessionStorage.removeItem('token')
          window.sessionStorage.removeItem('user')
          break;
      }
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
  .el-dropdown-link
    cursor pointer
    color #fff
</style>
