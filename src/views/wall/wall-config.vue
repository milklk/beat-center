<template>
  <div class="wall-config">
    <List
      v-if="!this.$route.query.id"
      :table="table"
      :tableData="tableData"
      :total="total"
      :api="api"
      :prompt="prompt"
      :del="del"
      :h="h"
    />
    <Detail v-else />
  </div>
</template>

<script>
import List from "../../components/list";
import Detail from "../../components/detail";
import {
  wallTableConfig,
  wallTableConfigDel,
  dictionary,
  wallConfigAddEdit
} from "../../api";
export default {
  name: "wall-config",
  data() {
    return {
      h: '情报墙图表',
      del: 'ids',
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
      api: {
        del: wallTableConfigDel,
        addEdit: {
          add: wallConfigAddEdit,
          edit: wallConfigAddEdit
        },
        acquire: this.wallConfig
      },
      reportType: [],
      cycleType:[]
    };
  },
  components: {
    List,
    Detail
  },
  computed: {
    prompt() {
      return [
        {
          name: "图表名称",
          options: this.reportType,
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
          options: this.cycleType,
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
    this.dictionary({ dicType: "reportType" });
    this.dictionary({ dicType: "cycleType" });
  },
  methods: {
    async wallConfig({ pageNumber, pageSize }) {
      const config = await wallTableConfig({ pageNumber, pageSize });
      config.data.list.forEach(d => (d.stateName = d.state ? "展示" : "未展示"));
      this.tableData = config.data.list;
      this.total = config.data.total;
    },
    async dictionary({ dicType },type) {
      const list = await dictionary({ dicType });
      if (list.ret === "200") {
        this[dicType] = list.data;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.wall-config
  box-sizing border-box
  width 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
</style>