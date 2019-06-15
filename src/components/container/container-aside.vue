<template>
  <div class="container-aside">
    <el-menu :default-active="index" class="el-menu-vertical-demo">
      <template v-for="(item,index) in paths">
        <router-link :to="item.paths[0].path" v-if="item.paths.length=== 1">
          <el-menu-item :index="item.paths[0].index" @click="setTab({...item.paths[0]})">
            <i :class="item.type.icon"></i>
            <span slot="title">{{item.type.name}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-if="item.paths.length > 1" :index="(index + 1).toString()">
          <template slot="title">
            <i :class="item.type.icon"></i>
            <span slot="title">{{item.type.name}}</span>
          </template>
          <router-link v-for="d in item.paths" :to="d.path" :key="d.index">
            <el-menu-item :index="d.index" @click="setTab({...d})">{{d.name}}</el-menu-item>
          </router-link>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "container-aside",
  data() {
    return {
      
    };
  },
  components: {},
  computed: {
    ...mapGetters("nav", {
      paths: "Paths",
      tabs: "Tabs",
      index: "Index"
    })
  },
  mounted() {
    const path = this.$route.path;
    const active = this.paths
      .map(d => d.paths)
      .flat()
      .find(d => d.path === path);
      this.$store.commit("nav/setIndex",{index:active.index});
  },
  methods: {
    setTab({ name, path, index }) {
      this.$store.commit("nav/setIndex",{index:index});
      const i = this.tabs.findIndex(d => d.index === index);
      if (i === -1) {
        this.$store.commit("nav/setTabs", {
          tab: { name, path, index },
          type: "push"
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
