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
        <el-button type="success" @click="add">增加</el-button>
        <el-button type="danger" @click="removes(tableData, selection)">
          删除
        </el-button>
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
        >
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              plain
              style="padding: 0px 0px;border: none;"
              @click.stop="edit(scope.$index, tableData)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              plain
              style="padding: 0px 0px;border: none;"
              @click.stop="remove(scope.$index, tableData)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="15"
          @current-change="currentChange"
          :current-page="page"
        >
        </el-pagination>
      </div>
    </main>
    <Prompt
      :addEdit="addEdit"
      :show="show"
      :prompt="prompt"
      :addEditApi="api.addEdit"
      :acquire="api.acquire"
      :editData="editData"
      :page="page"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Prompt from "./prompt";
export default {
  name: "list",
  props: {
    table: Array,
    tableData: Array,
    total: Number,
    api: Object,
    prompt: Array,
    del: String
  },
  data() {
    return {
      cellStyle: {
        "text-align": "center"
      },
      input: "",
      selection: [],
      addEdit: false,
      editData: {}
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
      this.$router.push({ path, query: { id: row.id } });
    },
    add() {
      this.addEdit = true;
    },
    edit(index, rows) {
      this.addEdit = true;
      const row = rows[index];
      const data = {};
      for (const key in row) {
        data[key] = row[key];
      }
      this.editData = data;
    },
    show(value) {
      this.addEdit = value;
    },
    remove(index, rows) {
      this.api.del({ [this.del]: rows[index].id });
      rows.splice(index, 1);
    },
    removes(rows, selection) {
      selection.forEach(d => {
        const i = rows.findIndex(row => row.id === d.id);
        this.api.del({ [this.del]: rows[i].id });
        rows.splice(i, 1);
      });
      this.selection = [];
    },
    select(selection) {
      this.selection = selection;
    },
    currentChange(val) {
      const path = this.$route.path;
      this.$store.commit("manage/setPage", { page: val });
      this.$router.push({ path, query: { page:val } });
      this.api.acquire({ pageNumber: this.page, pageSize: 15 });
    }
  },
  mounted() {
    const path = this.$route.path;
    const page = this.page;
    switch (page) {
      case 1:
        this.$router.push({ path });
        break;
      default:
        this.$router.push({ path, query: { page } });
        this.api.acquire({ pageNumber: this.page, pageSize: 15 });
    }
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
