<template>
  <section>
    <header>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" class="icon"></el-button>
      </el-input>
      <div>
        <el-button type="success">增加</el-button>
        <el-button type="danger">删除</el-button>
      </div>
    </header>
    <main>
      <el-table
        :data="tableData"
        style="width: 100%;border: 1px solid #EBEEF5;margin-bottom: 20px"
        :cell-style="cellStyle"
        :header-cell-style="cellStyle"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          :prop="tab.value"
          :label="tab.name"
          v-for="tab in table"
          :key="tab.value"
        >
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template>
            <el-button plain style="padding: 0px 0px;border: none;">
              编辑
            </el-button>
            <el-button
              type="danger"
              plain
              style="padding: 0px 0px;border: none;"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="100"> </el-pagination>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      cellStyle: {
        "text-align": "center"
      },
      input: "",
      table: [
        {
          name: "名称",
          value: "name"
        },
        {
          name: "时间",
          value: "time"
        },
        {
          name: "地点",
          value: "address"
        }
      ],
      tableData: [
        {
          time: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          time: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          time: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          time: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          time: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          time: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          time: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          time: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          time: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          time: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          time: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          time: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          time: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          time: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          time: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ]
    };
  },
  methods: {

  }
};
</script>

<style lang='stylus' scoped>
section
  box-sizing border-box
  background #ffffff
  width 100%
  min-height 760px
  padding 20px
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  header
    width 100%
    height 40px
    margin 0 0 20px
    display flex
    justify-content space-between
    align-items center
    .input-with-select
      width 240px
    .icon
      color #409EFF
      font-size 20px
  main
    min-height 660px
    width 100%
    position relative
    .block
      position absolute
      bottom 0
      right 0
</style>
