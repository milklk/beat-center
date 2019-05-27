<template>
  <nav>
    <div>
      <el-tag key="main" class="tag">
        {{ name }}
      </el-tag>
      <el-tag
        class="tag"
        closable
        @close="handleClose(tag)"
        type="info"
        :key="tag"
        v-for="tag in tags"
      >
        {{ tag }}
      </el-tag>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link tag">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">关闭所有</el-dropdown-item>
          <el-dropdown-item command="e" divided>关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      name: "案件",
      tags: [1, 2, 3]
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
nav
  box-sizing border-box
  background #ffffff
  width 100%
  margin-bottom 20px
  min-height 50px
  padding 0px 20px
  display flex
  justify-content space-between
  align-items center
  .tag
    cursor pointer
</style>