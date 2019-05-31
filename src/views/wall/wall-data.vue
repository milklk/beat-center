<template>
  <div class="wall-data">
    <Tab :name="'情报墙数据'" />
    <List
      v-if="!this.$route.query.id"
      :table="table"
      :tableData="tableData"
      :total="total"
      :api="api"
    />
    <Detail v-else :detail="detail" />
  </div>
</template>

<script>
import Tab from "../../components/tab";
import List from "../../components/list";
import Detail from "../../components/detail";
import { wallTableData, wallTableDataDel } from "../../api";
export default {
  name: "wall-config",
  data() {
    return {
      table: [
        {
          name: "数据名称",
          value: "name"
        },
        {
          name: "X轴名称",
          value: "abscissaName"
        },
        {
          name: "周期类型",
          value: "cycleName"
        },
        {
          name: "统计数量",
          value: "quantity"
        },

        {
          name: "来源/区域",
          value: "source"
        },
        {
          name: "统计时间",
          value: "statisticsDate"
        },
        {
          name: "状态",
          value: "stateName"
        }
      ],
      tableData: [],
      total: 0,
      api: {
        del: wallTableDataDel
      },
      detail: {
        name: ""
      }
    };
  },
  components: {
    Tab,
    List,
    Detail
  },
  computed: {},
  mounted() {
    this.wallData({ pageNumber: "1", pageSize: "15" });
  },
  methods: {
    async wallData({ pageNumber, pageSize }) {
      const data = await wallTableData({ pageNumber, pageSize });
      data.list.forEach(d => (d.stateName = d.state ? "展示" : "未展示"));
      this.tableData = data.list;
      this.total = data.total;
    }
  }
};
</script>

<style lang="stylus" scoped>
.wall-data
  box-sizing border-box
  width 100%
  padding 20px
  width 100%
  min-height 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
</style>