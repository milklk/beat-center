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
              @click.stop="edit"
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
          :total="30"
          :page-size="15"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { log } from "util";
export default {
  name: "list",
  props: {
    table: Array
  },
  data() {
    return {
      cellStyle: {
        "text-align": "center"
      },
      input: "",
      selection: []
    };
  },
  computed: {
    ...mapGetters("manage", {
      tableData: "gtableData",
      tags: "gtags"
    })
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
      this.$router.push({ path, query: { value: row.id } });
    },
    add() {
      console.log(1);
    },
    edit() {
      console.log(1);
    },
    remove(index, rows) {
      rows.splice(index, 1);
    },
    removes(rows, selection) {
      selection.forEach(d => {
        const i = rows.findIndex(row => row.id === d.id);
        rows.splice(i, 1);
      });
      this.selection = [];
    },
    select(selection) {
      this.selection = selection;
    },
    currentChange(val) {
      console.log(val);
    }
  },
  mounted() {
    this.$store.dispatch("manage/getManage");
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
