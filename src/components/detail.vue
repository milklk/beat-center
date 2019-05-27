<template>
  <section>
    <header>
      <h3>案件详情</h3>
      <ul>
        <li v-for="(detail, index) in details" :key="index">
          <dl v-for="item in detail" :key="item.name">
            <dt>{{ item.name }}：</dt>
            <dd>{{ item.value }}</dd>
          </dl>
        </li>
      </ul>
    </header>
    <main>
      <h3>变更记录</h3>
      <el-table
        :data="tableData"
        style="width: 100%;border: 1px solid #EBEEF5;margin-bottom: 20px"
        :cell-style="cellStyle"
        :header-cell-style="cellStyle"
      >
        <el-table-column
          :prop="tab.value"
          :label="tab.name"
          v-for="tab in table"
          :key="tab.value"
        >
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      details: [
        [
          {
            name: "案件名称",
            value: "520惨案"
          },
          {
            name: "时间",
            value: "2019-05-20"
          },
          {
            name: "地点",
            value: "不知名的街道"
          }
        ],
        [
          {
            name: "涉案人员",
            value: "FFF团"
          }
        ]
      ],
      cellStyle: {
        "text-align": "center"
      },
      table: [
        {
          name: "变更详情",
          value: "label"
        },
        {
          name: "变更人",
          value: "name"
        },
        {
          name: "变更时间",
          value: "time"
        }
      ],
      tableData: [
        {
          time: "2016-05-02",
          name: "王小虎",
          label: "上海市普陀区金沙江路 1518 弄"
        },
        {
          time: "2016-05-04",
          name: "王小虎",
          label: "上海市普陀区金沙江路 1517 弄"
        },
        {
          time: "2016-05-01",
          name: "王小虎",
          label: "上海市普陀区金沙江路 1519 弄"
        },
        {
          time: "2016-05-03",
          name: "王小虎",
          label: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
section
  
  
  width 100%
  
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  header
    width 100%
    box-sizing border-box
    margin 0 0 20px
    background #ffffff
    padding 20px
    ul
      width 100%
      li 
        width 100%
        box-sizing border-box
        margin-top 20px
        padding-left 30px
        display flex
        justify-content flex-start
        align-items center
        dl 
          display flex
          justify-content flex-start
          align-items center
          margin-right 20px
          font-size 14px

  main
    width 100%
    box-sizing border-box
    position relative
    background #ffffff
    padding 20px
    .block
      position absolute
      bottom 0
      right 6px
  h3
    font-size 18px
    font-weight 700
    margin 0 0 20px
</style>