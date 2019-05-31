<template>
  <div class="wall-config">
    <Tab :name="'情报墙图表'" />
    <List
      v-if="!this.$route.query.id"
      :table="table"
      :tableData="tableData"
      :total="total"
      :api="api"
      :prompt="prompt"
    />
    <Detail v-else :detail="detail" />
  </div>
</template>

<script>
import Tab from "../../components/tab";
import List from "../../components/list";
import Detail from "../../components/detail";
import {
  wallTableConfig,
  wallTableConfigDel,
  wallTableType,
  wallConfigAddEdit
} from "../../api";
export default {
  name: "wall-config",
  data() {
    return {
      table: [
        {
          name: "图表名称",
          value: "name"
        },
        {
          name: "统计周期",
          value: "dataCycle"
        },
        {
          name: "周期类型",
          value: "cycleName"
        },
        {
          name: "状态",
          value: "stateName"
        }
      ],
      tableData: [],
      total: 0,
      detail: {
        name: ""
      },
      api: {
        del: wallTableConfigDel,
        addEdit: wallConfigAddEdit,
        acquire: this.wallConfig
      },
      type: []
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
          name: "图表名称",
          options: this.type,
          value: "",
          types: {
            code: 'type',
            value: 'name',
            id: "id"
          }
        },
        {
          name: "统计周期",
          value: "",
          types: "dataCycle"
        },
        {
          name: "周期类型",
          options: [
            {
              value: '年',
              code: 'YEAR'
            },
            {
              value: '季',
              code: 'QUAR'
            },
            {
              value: '月',
              code: 'MON'
            },
            {
              value: '周',
              code: 'WEEK'
            },
            {
              value: '日',
              code: 'DAY'
            },
          ],
          value: "",
          types: {
            code: 'cycleType',
            value: 'cycleName'
          }
        },
        {
          name: "状态",
          options: [
            {
              value: '展示',
              code: '1'
            },
            {
              value: '不展示',
              code: '0'
            },
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
    this.wallConfig({ pageNumber: 1, pageSize: 15 });
    this.wallConfigType({ dicType: "reportType" });
  },
  methods: {
    async wallConfig({ pageNumber, pageSize }) {
      const config = await wallTableConfig({ pageNumber, pageSize });
      config.list.forEach(d => (d.stateName = d.state ? "展示" : "未展示"));
      this.tableData = config.list;
      this.total = config.total;
    },
    async wallConfigType({ dicType }) {
      const type = await wallTableType({ dicType });
      if (type.ret === "200") {
        this.type = type.data;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.wall-config
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