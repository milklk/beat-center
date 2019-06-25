<template>
  <div class="case">
    <header v-if="!this.$route.query.id && !caseShow">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" class="icon"></el-button>
      </el-input>
      <div>
        <el-button type="success" @click="add">增加</el-button>
        <!-- <el-button type="danger" @click="removes">删除</el-button> -->
      </div>
    </header>
    <List
      :table="table"
      :tableData="tableData"
      :total="total"
      v-on:getList="getList"
      v-on:remove="remove"
      v-on:edit="edit"
      v-on:dblclick="dblclick"
      :selection="selection"
      v-if="!caseShow"
    />
    <StepsForm v-show="caseShow" :case-type="caseType" :api-show="apiShow" @setShow="setShow" :api="api" :case-detail="caseDetail"/>
    <!-- <Detail v-else/> -->
  </div>
</template>

<script>
import List from "../../components/pagelist";
import Detail from "../../components/detail";
import StepsForm from "../../components/steps-form";
import { caseManage, caseDrug, casePerson } from "../../api";
import {
  caseList,
  dictionary,
  glevelCity,
  caseDel,
  axiosRest
} from "../../api";
export default {
  name: "case-manage",
  data() {
    return {
      api:[caseManage,caseDrug,casePerson],
      apiShow: "add",
      actionUrl: "",
      caseShow: false,
      selection: [],
      total: 0,
      input: "",
      informationFiles: [],
      table: [
        {
          name: "案件名称",
          value: "name"
        },
        {
          name: "案件编号",
          value: "code"
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
      caseType: [],
      area: [],
      caseDetail: {}
    };
  },
  components: {
    List,
    Detail,
    StepsForm
  },
  async created() {
    await this.dictionary({ dicType: "caseType" });
    await this.caseList({ pageNumber: 1, pageSize: 15, keywords: "" })
  },
  methods: {
    add() {
      this.caseShow = true;
      this.apiShow = "add";
    },
    async edit(row) {
      this.caseShow = true;
      this.apiShow = "edit";
      let result = await axiosRest("/bsCase/detail", { id: row.id }, "get");
      if(result.ret === "200") {
        this.caseDetail = result.data
      }

      // this.form = result.data.information;
      // if (this.form.fileId) {
      //   let fileResult = await axiosRest(
      //     "/attachment/getFileList",
      //     { relationId: this.form.fileId },
      //     "get"
      //   );
      //   fileResult.data.forEach(d => (d.name = d.oldFileName));
      //   this.fileList = fileResult.data;
      //   this.areaId = getFullArea(this.form.areaId, this.area);
      // }
    },
    async getList(data) {
      const list = await this.caseList({ ...data,keywords: "" })
      this.tableData = result.data.list;
      this.total = result.data.total;
    },
    async remove(id) {
      let result = await caseDel({ id });
      if (result.ret == "200") {
        this.$message({
          message: "删除成功！",
          type: "success",
          center: true
        });
        const i = this.tableData.findIndex(d => d.id === id);
        this.tableData.splice(i, 1);
      }
    },

    dblclick() {},
    async caseList({ pageNumber, pageSize, keywords }) {
      const data = await caseList({ pageNumber, pageSize, keywords });
      if (data.ret === "200") {
        data.data.list.forEach(
          d =>
            (d.stateName =
              d.state == 0 ? "未破案" : d.state == 1 ? "已破案" : "无状态")
        );
        data.data.list.forEach(d => (d.type = d.type.toString()));
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
          this.tableData = data.data.list;
          this.total = data.data.total;
        });
      }
    },
    async dictionary({ dicType }, type) {
      const list = await dictionary({ dicType });
      if (list.ret === "200") {
        this[dicType] = list.data;
      }
    },
    setShow(show) {
      this.caseShow = show;
    }
  }
};
</script>

<style lang="stylus" scoped>
.case {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #ffffff;
  min-height: calc(100% - 70px);
  padding: 20px;
}

header {
  width: 100%;
  height: 40px;
  margin: 0 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input-with-select {
    width: 240px;
  }

  .icon {
    color: #409EFF;
    font-size: 20px;
  }
}
</style>