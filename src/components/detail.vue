<template>
  <section>
    <header>
      <h3>{{title}}详情</h3>
    </header>
    <main>
      <ul>
        <li></li>
        <li>
          <el-table
            :data="tableData"
            style="width: 100%;border: 1px solid #EBEEF5;margin-bottom: 20px"
          >
            <el-table-column
              :prop="tab.value"
              :label="tab.name"
              v-for="tab in table"
              :key="tab.value"
              :formatter="tab.formatter"
            ></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  plain
                  style="padding: 0px 0px;border: none;"
                  @click.stop="edit(scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  plain
                  style="padding: 0px 0px;border: none;"
                  @click.stop="remove(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </li>
        <li></li>
      </ul>
    </main>
  </section>
</template>

<script>
export default {
  name: "detail",
  props: {
    title: String
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
section {
  width: 100%;
  height: 100%;
  padding: 20px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
  }

  header {
    width: 100%;
    background: #fff;
    padding: 20px;
  }

  main {
    width: 100%;
    padding: 20px;
    background: #fff;
  }
}
</style>