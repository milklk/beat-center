<template>
  <div>
    <header>
      <el-steps :active="1" simple>
        <el-step title="案件基本信息" icon="el-icon-edit"></el-step>
        <el-step title="案件毒品信息" icon="el-icon-edit"></el-step>
      </el-steps>
    </header>
    <section></section>
    <section></section>
    <footer>
      <el-button type="success" @click="success">提交</el-button>
      <el-button type="info" @click="info">取消</el-button>
    </footer>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "case-detail",
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="stylus" scoped></style>
