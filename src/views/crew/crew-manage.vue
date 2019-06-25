<template>
  <div class="crew">
    <Detail v-if="$route.query.name" :title="'人员'"/>
    <Force v-else-if="$route.query.force"/>
    <section class="list-section" v-else>
      <header>
        <div class="search-div">
          <el-form
            label-position="right"
            label-width="80px"
            :inline="true"
            :model="search"
            class="form-inline"
          >
            <el-form-item label="姓名:">
              <el-input class="search-input" v-model="search.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
              <el-input class="search-input" v-model="search.idCard" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item label="昵称:">
              <el-input class="search-input" v-model="search.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:">
              <el-input class="search-input" v-model="search.telMe" placeholder="联系方式"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="getList">查询</el-button>
              <el-button size="small" @click="getList">重置</el-button>
            </el-form-item>
          </el-form>

          <!-- <el-button type="danger" @click="removes">删除</el-button> -->
        </div>
        <div class="button-div">
          <el-button size="small" type="success" @click="add" icon="el-icon-plus">增加</el-button>
        </div>
      </header>
      <main class="list-main">
        <el-table
          ref="eltable"
          :data="tableData"
          :show-header="false"
          style="width: 100%;border: 1px solid #EBEEF5;margin-bottom: 20px"
          :header-cell-style="cellStyle"
          @row-dblclick="dblclick"
        >
          <el-table-column width="100">
            <template slot-scope="scope">
              <el-image
                style="width: 60px; height: 60px"
                :src="getImageUrl(scope.row.mainPhoto)"
                fit="full"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div class="double-margin">
                <h4 class="p-h4">
                  <el-tag size="small">{{scope.row.name}}</el-tag>
                  <el-tag
                    size="small"
                    effect="plain"
                    :type="scope.row.sex === 1 ? 'success' : 'danger'"
                    disable-transitions
                  >{{scope.row.sex==1 ?'男':'女'}}</el-tag>
                </h4>
                <div class="content-div">昵称：{{scope.row.nickname}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div class="double-margin">
                <!-- <h4 class="p-h4"><el-tag size="small">身份证号</el-tag></h4>
              <div class="content-div">
                {{scope.row.idCard}}
                </div>-->
                <span class="p-span">身份证号</span>
                <p class="content-div">{{scope.row.idCard}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div class="double-margin">
                <span class="p-span">出生日期</span>
                <p class="content-div">{{scope.row.bir}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div class="double-margin">
                <span class="p-span">身高：{{scope.row.height}} CM</span>
                <p class="content-div">体重：{{scope.row.weight}} Kg</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div class="double-margin">
                <span class="p-span">联系方式</span>
                <p class="content-div">{{scope.row.telMe}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope" width="200">
              <div class="double-margin">
                <span class="p-span">人员特征</span>
                <p
                  class="content-div"
                  :title="scope.row.remark"
                  style="max-weight:150px;height: 25px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;"
                >{{scope.row.remark}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-button
                plain
                type="success"
                style="padding: 0px 0px;border: none;"
                @click.stop="force(scope.$index, scope.row)"
              >关系图</el-button>
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
            layout="total,prev, pager, next"
            :total="total"
            :page-size="8"
            @current-change="currentChange"
            @size-change="handleSizeChange"
            :current-page="page"
          ></el-pagination>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import { axiosRest, axiosFiles, axiosUrl } from "../../api";
import Detail from "../../components/detail";
import Force from "../../components/force";
export default {
  name: "crew-manage",
  data() {
    return {
      search: {
        name: "",
        idCard: "",
        nickname: "",
        telMe: ""
      },
      total: 0,
      pageSize: 8,
      page: 1,
      cellStyle: {
        "text-align": "center"
      },
      tableData: []
    };
  },
  components: {
    Detail,
    Force
  },
  computed: {},
  mounted() {
    this.getList();
  },
  methods: {
    getImageUrl(id) {
      if (id) {
        return axiosUrl() + "/attachment/downloadFile?attId=" + id;
      }
      return "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1509104047,3435922294&fm=26&gp=0.jpg";
    },
    dblclick(row) {
      this.$router.push({ path: "/crew-manage", query: { name: row.name } });
    },
    add() {},
    force(index, row) {
      this.$router.push({ path: "/crew-manage", query: { force: row.name } });
    },
    edit(index, row) {},
    remove(index, row) {},
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    currentChange(val) {
      this.page = val;
      this.getList(val - 1);
    },
    async getList(i) {
      let result = await axiosRest("/bsPerson/list", this.search, "get");
      this.tableData = result.data.list.splice(i * 8, 8);
      this.total = result.data.total;
    }
  }
};
</script>

<style lang="stylus" scoped>
.crew {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100% - 70px);

  header {
    height: auto;
    display: block;
    margin: 0px 0px 10px 0px;

    .button-div {
      height: 35px;
      width: 100%;
      text-align: right;
    }

    .search-div {
      width: 100%;
    }

    .search-div .form-inline {
    }

    .search-div .form-inline .search-input {
      width: 202px;
    }
  }
}
</style>