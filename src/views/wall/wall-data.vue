<template>
  <div class="wall-data">
    <Tab :name="'情报墙数据'" />
    <List
      v-if="!this.$route.query.id"
      :table="table"
      :tableData="tableData"
      :total="total"
      :api="api"
      :prompt="prompt"
      :del="del"
    />
    <Detail v-else />
  </div>
</template>

<script>
import Tab from "../../components/tab";
import List from "../../components/list";
import Detail from "../../components/detail";
import {
  wallTableData,
  wallTableDataDel,
  wallDataAddEdit,
  tableType,
  wallList
} from "../../api";
export default {
  name: "wall-config",
  data() {
    return {
      del: 'ids',
      table: [
        {
          name: "数据名称",
          value: "name"
        },
        {
          name: "数量名称",
          value: "abscissaName"
        },
        {
          name: "数量",
          value: "quantity"
        },
        {
          name: "统计周期",
          value: "cycleName"
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
        del: wallTableDataDel,
        addEdit: wallDataAddEdit,
        acquire: this.wallData
      },
      reportType: [],
      cycleType: []
    };
  },
  components: {
    Tab,
    List,
    Detail
  },
  computed: {
    prompt() {
      return [
        {
          name: "数据名称",
          value: "",
          types: {
            value: "name",
            id: "id"
          }
        },
        {
          name: "所属图表",
          options: this.reportType,
          value: "",
          types: {
            code: "type",
            value: "title"
          }
        },
        {
          name: "数量名称",
          value: "",
          types: "abscissaName"
        },
        {
          name: "数量",
          value:'',
          types: "quantity"
        },
        {
          name: "统计周期",
          options: this.cycleType,
          value: "",
          types: {
            code: "cycleType",
            value: "cycleName"
          }
        },
        {
          name: "来源/区域",
          value: '',
          types: "source"
        },
        {
          name: "统计时间",
          value: '',
          types: "statisticsDate",
          picker: 'picker'
        },
        {
          name: "状态",
          options: [
            {
              value: "展示",
              code: "1"
            },
            {
              value: "不展示",
              code: "0"
            }
          ],
          value: "",
          types: {
            code: "state"
          }
        }
      ];
    }
  },
  mounted() {
    this.wallData({ pageNumber: "1", pageSize: "15" });
    this.tableType({ dicType: "reportType" });
    this.tableType({ dicType: "cycleType" });
    this.tableType({ dicType: "drugsType" });
  },
  methods: {
    async wallData({ pageNumber, pageSize }) {
      const data = await wallTableData({ pageNumber, pageSize });
      data.list.forEach(d => (d.stateName = d.state ? "展示" : "未展示"));
      this.tableData = data.list;
      this.total = data.total;
    },
    async tableType({ dicType }, type) {
      const list = await tableType({ dicType });
      if (list.ret === "200") {
        this[dicType] = list.data;
      }
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