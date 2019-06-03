<template>
  <div class="case">
    <Tab :name="'案件'" />
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
import { caseList, tableType, glevelCity,caseDel } from "../../api";
export default {
  name: "case-manage",
  data() {
    return {
      table: [
        {
          name: "案件名称",
          value: "name"
        },
        {
          name: "案件类型",
          value: "typeName"
        },
        {
          name: "案件内容",
          value: "content"
        },
        {
          name: "缴获毒品数量",
          value: "drugCount"
        },
        {
          name: "详细地点",
          value: "happenAddress"
        },
        {
          name: "区域",
          value: "areaName"
        },
        {
          name: "办案人员",
          value: "managerName"
        },
        {
          name: "状态",
          value: "stateName"
        },
        {
          name: "案件时间",
          value: "happenName"
        }
      ],
      tableData: [],
      total: 0,
      caseType: [],
       api: {
        del: caseDel,
      
        acquire: this.caseList
      },
      area: [],
      del: 'id'
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
          name: "案件名称",
          value: "",
          types: {
            value: "name",
            id: "id"
          }
        },
        {
          name: "案件类型",
          options: this.caseType,
          value: "",
          types: {
            code: "type",
            value: "typeName"
          }
        },
        {
          name: "案件内容",
          value: "",
          types: "content"
        },
        {
          name: "缴获毒品数量",
          value: "",
          types: "drugCount"
        },
        {
          name: "详细地点",
          value: "",
          types: "happenAddress"
        },
        {
          name: "区域",
          value: "",
          types: "happenAddress"
        },
        {
          name: "办案人员",
          value: "",
          types: "managerName"
        },
        {
          name: "状态",
          options: [
            {
              value: "已破案",
              code: "1"
            },
            {
              value: "新建",
              code: "0"
            },
            {
              value: "关闭",
              code: "2"
            }
          ],
          value: "",
          types: {
            code: "state"
          }
        },
        {
          name: "案件时间",
          value: "",
          types: "happenTime",
          picker: "picker",
          stamp: 'stamp'
        },
        {
          name: "附件",
          value: '',
          upload: 'upload'
        }
      ];
    }
  },
  async mounted() {
    await this.TableType({ dicType: "caseType" });
    await this.caseList({ pageNumber: 1, pageSize: 15, keywords: "" });
    // this.levelcity({levelCity:'4503'})
  },
  methods: {
    async caseList({ pageNumber, pageSize, keywords }) {
      const data = await caseList({ pageNumber, pageSize, keywords });
      data.list.forEach(
        d =>
          (d.stateName =
            d.state == 0 ? "新建" : d.state == 1 ? "已破案" : "关闭")
      );
      data.list.forEach(
        d =>
          (d.type = d.type.toString())
      );
      data.list.forEach(
        d => (d.typeName = this.caseType.find(e => e.code == d.type).value)
      );
      data.list.forEach(d => {
        const date = new Date(d.happenTime);
        const Y = date.getFullYear() + "-";
        const M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        d.happenName = Y + M + D;
      });
      this.tableData = data.list;
      this.total = data.total;
    },
    async TableType({ dicType }, type) {
      const list = await tableType({ dicType });
      if (list.ret === "200") {
        this[dicType] = list.data;
      }
    },
    async levelcity({ levelCity }) {
      const list = await glevelCity({ levelCity });
      this.area = list.list
      console.log(list.list)
    }
  }
};
</script>

<style lang="stylus" scoped>
.case
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