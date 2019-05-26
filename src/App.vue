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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import containerHeader from './components/container/container-header'
import containerAside from './components/container/container-aside'

export default {
  name: 'app',
  components: {
    containerHeader,
    containerAside
  }
}
</script>

<style></style>
