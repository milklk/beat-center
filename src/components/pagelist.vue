<template>
    <main>
      <el-table
        ref="eltable"
        :data="tableData" stripe
        style="width: 100%;border: 1px solid #EBEEF5;margin-bottom: 20px"
        :cell-style="cellStyle"
        :header-cell-style="cellStyle"
        @row-click="click"
        @row-dblclick="dblclick"
        @select="select"
        @select-all="select"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column :prop="tab.value" :label="tab.name" v-for="tab in table" :key="tab.value" :formatter="tab.formatter"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              plain
              style="padding: 0px 0px;border: none;"
              @click.stop="edit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              plain
              style="padding: 0px 0px;border: none;"
              @click.stop="remove(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="total, sizes,prev, pager, next"
          :total="total"
          :page-size="15"
          :page-sizes="[15, 50, 100, 200]"
          @current-change="currentChange"
          @size-change="handleSizeChange"
          :current-page="page"
        ></el-pagination>
      </div>
    </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "list",
  props: {
    table: Array,
    tableData: Array,
    total:Number,
  },
  data() {
    return {
      pageSize:15,
      page:1,
      cellStyle: {
        "text-align": "center"
      },
      selection: []
    };
  },
  computed: {
    // ...mapGetters("manage", {
    //   page: "gpage",
    // })
  },
  components: {
  },
  methods: {
    dblclick(row) {
      this.$emit('dblclick', row);
    },
    edit(index, row) {
      this.$emit('edit', row);
      // this.getList();
    },
    remove(index, row) {
      this.$emit('remove', row.id);
      // this.getList();
    },
    click(row, column, cell, event){
      this.$refs.eltable.toggleRowSelection(row);
      this.selection = this.$refs.eltable.toggleAllSelection
      this.$emit('setSelection', this.selection);
    },
    select(selection) {
      this.selection = selection;
      this.$emit('setSelection', this.selection);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    currentChange(val) {
      this.page = val;
      // const path = this.$route.path;
      // this.$store.commit("manage/setPage", { page: val });
      // this.$router.push({ path, query: { page: val } });
      this.getList();
    },
    getList(){
        this.$emit('getList', { pageNumber: this.page, pageSize: this.pageSize });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="stylus" scoped>
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
  </style>