<template>
  <div class="case">
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
import { caseList, dictionary, glevelCity,caseDel,caseAdd,caseEdit } from "../../api";
export default {
  name: "case-manage",
  data() {
    return {
      h: "案件",
      table: [
        {
          name: "案件名称",
          value: "name"
        },
        {
          name: "案件编号",
          value:"code"
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
          value: "happenTime"
        }
      ],
      tableData: [],
      total: 0,
      caseType: [],
       api: {
        del: caseDel,
        addEdit: {
          add: caseAdd,
          edit: caseEdit,
        },
        acquire: this.caseList,
        keywords: true
      },
      area: [],
      del: 'id'
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
          name: "案件编号",
          value:"",
          types:"code"
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
          options: this.area,
          value: "",
          types: {
             code: "areaId",
            value: "areaName"
          }
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
          // upload: 'upload',
          types: "fileId"
        }
      ];
    }
  },
  async mounted() {
    await this.dictionary({ dicType: "caseType" });
    await this.caseList({ pageNumber: 1, pageSize: 15, keywords: "" });
    await this.levelcity({levelCity:'4503'})
  },
  methods: {
    async caseList({ pageNumber, pageSize, keywords }) {
      const data = await caseList({ pageNumber, pageSize, keywords });
      data.data.list.forEach(
        d =>
          (d.stateName =
            d.state == 0 ? "新建" : d.state == 1 ? "已破案" : "关闭")
      );
      data.data.list.forEach(
        d =>
          (d.type = d.type.toString())
      );
      data.data.list.forEach(
        d => (d.typeName = this.caseType.find(e => e.code == d.type).value)
      );
      data.data.list.forEach(d => {
        const date = new Date(d.happenTime);
        const Y = date.getFullYear() + "-";
        const M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        d.happenTime = Y + M + D;
      });
      this.tableData = data.data.list;
      this.total = data.data.total;
    },
    async dictionary({ dicType }, type) {
      const list = await dictionary({ dicType });
      if (list.ret === "200") {
        this[dicType] = list.data;
      }
    },
    async levelcity({ levelCity }) {
      const list = await glevelCity({ levelCity });
      list.list.forEach(d => {
          this.area.push({code:d.code,value:d.name})
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.case
  box-sizing border-box
  width 100%
  width 100%
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
</style>