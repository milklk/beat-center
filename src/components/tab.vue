<template>
  <nav>
    <div>
      <el-tag key="main" class="tag" @click="pushName">
        {{ name }}
      </el-tag>
      <el-tag
        class="tag"
        closable
        :disable-transitions="disable"
        @close="handleClose(index, tag)"
        @click="pushTag(tag.id)"
        :type="$route.query.value !== tag.id ? 'info' : ''"
        :key="index"
        v-for="(tag, index) in tags"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <div>
      <el-dropdown @command="tagsExit">
        <span class="el-dropdown-link tag">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="allExit">关闭所有</el-dropdown-item>
          <el-dropdown-item command="elseExit" divided
            >关闭其他</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "tab",
  props: {
    name: String,
    table: Array
  },
  data() {
    return {
      disable: true
    };
  },
  components: {},
  computed: {
    ...mapGetters("manage", {
      tags: "gtags"
    })
  },
  mounted() {
    const id = this.$route.query.value;
    if (id) {
      this.$store.dispatch("manage/getManage", id).then(() => {
        console.log(this.tags);
        if (this.tags.length === 0) {
          this.$store.commit("manage/setTags", { type: "all" });
        }
      });
    } else {
      this.$store.commit("manage/setTags", { type: "all" });
    }
  },
  methods: {
    handleClose(index, tag) {
      const path = this.$route.path;
      const id = this.$route.query.value;
      if (id === tag.id) {
        if (this.tags.length - 1 !== 0) {
          if (index === this.tags.length - 1) {
            const tag = this.tags[index - 1];
            this.$router.push({ path, query: { value: tag.id } });
          } else {
            const tag = this.tags[index + 1];
            this.$router.push({ path, query: { value: tag.id } });
          }
        } else {
          this.$router.push({ path });
        }
      }
      this.tags.splice(index, 1);
    },
    pushTag(id) {
      const path = this.$route.path;
      this.$router.push({ path, query: { value: id } });
    },
    pushName() {
      const path = this.$route.path;
      this.$router.push({ path });
    },
    tagsExit(command) {
      switch (command) {
        case "allExit":
          this.$store.commit("manage/setTags", { type: "all" });
          break;
        default:
          if (this.$route.query.value) {
            const name = this.tags.find(d => this.$route.query.value === d.id);
            this.$store.commit("manage/setTags", { tag: name, type: "find" });
          }
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