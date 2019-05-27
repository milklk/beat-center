<template>
  <nav>
    <div>
      <el-tag key="main" class="tag" @click="pushName">
        {{ name }}
      </el-tag>
      <el-tag
        class="tag"
        closable
        @close="handleClose(tag)"
        @click="pushTag(tag)"
        type="info"
        :key="tag"
        v-for="tag in tags"
      >
        {{ tag }}
      </el-tag>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link tag" @command="tagsExit">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
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
export default {
  name: "tab",
  props: {
    name: String,
    tags: Array
  },
  data() {
    return {
      tag: this.$route.query.value
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    pushTag(tag) {
      const path = this.$route.path;
      this.$router.push({ path, query: { value: tag } });
    },
    pushName() {
      const path = this.$route.path;
      this.$router.push({ path});
    },
    tagsExit(command) {
      switch (command) {
        case 'allExit':
          
          break;
      
        default:
          break;
      }
    }
  }
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