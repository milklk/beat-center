<template>
  <section>
    <header>
      <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" class="icon"></el-button>
      </el-input>
      <div>
        <el-button type="success" @click="add">增加</el-button>
        <el-button type="danger" @click="removes">删除</el-button>
      </div>
    </header>
    <main>
      <el-table
        :data="tableData"
        style="width: 100%;border: 1px solid #EBEEF5;margin-bottom: 20px"
        :cell-style="cellStyle"
        :header-cell-style="cellStyle"
        @row-click="rowclick"
        @select="select"
        @select-all="select"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          :prop="tab.value"
          :label="tab.name"
          v-for="tab in table"
          :key="tab.value"
          :formatter="tab.formatter"
        ></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button plain style="padding: 0px 0px;border: none;" @click.stop="edit(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              plain
              style="padding: 0px 0px;border: none;"
              @click.stop="remove(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="total,prev, pager, next"
          :total="total"
          :page-size="15"
          @current-change="currentChange"
          :current-page="page"
        ></el-pagination>
      </div>
    </main>
    <Prompt
      :addEdit="addEdit"
      :show="show"
      :prompt="prompt"
      :addEditApi="addEditApi"
      :acquire="api.acquire"
      :editData="editData"
      :page="page"
      :h="h"
      :keywords="api.keywords"
    />
    <el-dialog title="温馨提示" :visible.sync="delshow" width="30%" top="35vh">
      <span style="text-align:center;">确认删除数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delBtn">确 定</el-button>
        <el-button @click="delshow = false">取 消</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Prompt from "./prompt";
import api from "../api/proxy";
import { Message } from "element-ui";
export default {
  name: "list",
  props: {
    table: Array,
    tableData: Array,
    total: Number,
    api: Object,
    prompt: Array,
    del: String,
    h: String
  },
  data() {
    return {
      delshow: false,
      delstatus: false,
      cellStyle: {
        "text-align": "center"
      },
      keyword: "",
      selection: [],
      addEdit: false,
      editData: {},
      addEditApi() {}
    };
  },
  computed: {
    ...mapGetters("manage", {
      tags: "gtags",
      page: "gpage"
    })
  },
  components: {
    Prompt
  },
  methods: {
    rowclick(row) {
      const index = this.tags.findIndex(d => d.id === row.id);
      if (index === -1) {
        this.$store.commit("manage/setTags", {
          tag: { name: row.name, id: row.id },
          type: "push"
        });
      }
      const path = this.$route.path;
      // this.$router.push({ path, query: { id: row.id } });
    },
    add() {
      this.addEdit = true;
      this.addEditApi = this.api.addEdit.add;
    },
    edit(index, rows) {
      this.addEdit = true;
      const row = rows[index];
      const data = {};
      for (const key in row) {
        data[key] = row[key];
      }
      this.editData = data;
      this.addEditApi = this.api.addEdit.edit;
    },
    show(value) {
      this.addEdit = value;
    },
    remove(row) {
      this.delshow = true;
      this.selection.push(row);
    },
    removes(rows, selection) {
      if (this.selection.length) {
        this.delshow = true;
      } else {
        Message.error({
          message: "无需要删除的数据",
          center: true
        });
      }
    },
    delBtn() {
      let selI = 0;
      this.selection.forEach(d => {
        const i = this.tableData.findIndex(row => row.id === d.id);
        this.api.del({ [this.del]: this.tableData[i].id }).then(data => {
          if (data.ret === "200") {
            selI++;
            this.tableData.splice(i, 1);
          }
          if (selI === this.selection.length) {
            Message.success({
              message: "删除成功",
              center: true
            });
            this.selection = [];
            this.delshow = false;
            if (this.api.keywords) {
              this.api.acquire({
                pageNumber: this.page,
                pageSize: 15,
                keywords: this.keyword
              });
            } else {
              this.api.acquire({ pageNumber: this.page, pageSize: 15 });
            }
          }
        });
      });
    },
    select(selection) {
      this.selection = selection;
    },
    currentChange(val) {
      const path = this.$route.path;
      this.$store.commit("manage/setPage", { page: val });
      // this.$router.push({ path, query: { page: val } });
      if (this.api.keywords) {
        this.api.acquire({
          pageNumber: this.page,
          pageSize: 15,
          keywords: this.keyword
        });
      } else {
        this.api.acquire({ pageNumber: this.page, pageSize: 15 });
      }
    }
  },
  mounted() {}
};
</script>

<style lang='stylus' scoped>
section {
  box-sizing: border-box;
  background: #ffffff;
  width: 100%;
  min-height: 760px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

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

  main {
    min-height: 660px;
    width: 100%;
    position: relative;

    .block {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
