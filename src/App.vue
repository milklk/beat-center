<template>
  <div id="app">
    <el-container v-if="this.$route.path !== '/login'" key="user">
      <el-header>
        <container-header/>
      </el-header>
      <el-container>
        <el-aside>
          <container-aside/>
        </el-aside>
        <el-main>
          <div class="container-mian">
            <containerTab/>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import containerHeader from "./components/container/container-header";
import containerAside from "./components/container/container-aside";
import containerTab from "./components/container/container-tab";

export default {
  name: "app",
  components: {
    containerHeader,
    containerAside,
    containerTab
  }
};
</script>

<style>
.container-mian {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
