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

<style lang="stylus">
.container-mian {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 700px;
  min-width: 1600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.list-section {
  box-sizing: border-box;
  background: #ffffff;
  width: 100%;
  min-height: 760px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  header {
    width: 100%;
    height: 40px;
    margin: 0px 0px 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .input-with-select {
      width: 240px;
    }

    .icon {
      color: #409EFF;
      font-size: 20px;
    }
  }
}

.list-main{
  min-height: 660px;
  width: 100%;
  position: relative;
  
  .double-margin{
    margin: 5px 0px 5px 0px;
  }
  .double-margin .p-h4{
    text-align:left;
    color: #000000a6;
    font-size: 14px;
  }
  .double-margin .content-div{
    text-align:left;
    color: #00000073;
    font-size: 14px;
  }
  .double-margin .p-span{
    line-height :20px;
    text-align:left;
    color: #00000073;
    font-size: 14px;
  }

  .block {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}


</style>
