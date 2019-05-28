<template>
  <div class="container-header">
    <h1>禁毒中心</h1>
    <span class="el-dropdown-link">
      {{ user }}<i class="iconfont icon-tuichu" @click="exit"></i>
    </span>
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
    exit() {
      this.$router.push({ path: "/login" });
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("user");
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
  i
    margin-left 20px
</style>
