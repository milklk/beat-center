<template>
  <div class="prompt" v-show="divShow">
    <header>
      <h3>情报墙图表</h3>
      <i class="el-icon-close" @click="promptShow()"></i>
    </header>
    <main>
      <div v-for="item in labels" :key="item.name">
        {{ item.name }}：
        <el-input
          placeholder="请输入内容"
          v-model="item.value"
          style="width: 220px"
          v-if="!item.options && !item.picker"
        >
        </el-input>
        <el-select
          v-model="item.value"
          placeholder="请选择"
          style="width: 220px"
          v-else-if="item.options"
        >
          <el-option
            v-for="option in item.options"
            :key="option.code"
            :label="option.value"
            :value="option.code"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="item.value"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          v-else-if="item.picker"
        >
        </el-date-picker>
      </div>
    </main>
    <footer>
      <el-button type="success" @click="success">提交</el-button>
      <el-button type="info" @click="info">取消</el-button>
    </footer>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { type } from "os";
import { log } from "util";
export default {
  name: "prompt",
  props: {
    prompt: Array,
    addEdit: Boolean,
    show: Function,
    addEditApi: Function,
    editData: Object,
    acquire: Function,
    page: Number
  },
  data() {
    return {
      labels: [],
      divShow: this.addEdit,
      a: true
    };
  },
  watch: {
    prompt() {
      this.labels = this.prompt.map(o => ({ ...o }));
    },
    addEdit() {
      this.divShow = this.addEdit;
    },
    editData() {
      this.labels.forEach(d => {
        if (!d.options) {
          d.value = this.editData[d.types];
        } else if (d.types.value) {
          d.value = this.editData[d.types.code];
        } else if (d.types.code) {
          const code = this.editData[d.types.code];
          const find = d.options.find(e => e.code == code);
          d.value = find.code;
        }
        if (d.types.value === "name") {
          d.options = undefined;
          d.value = this.editData[d.types.value];
          d[d.types.code] = this.editData[d.types.code];
          d.id = this.editData.id;
        }
      });
    }
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    promptShow() {
      this.show(false);
      this.labels = this.prompt.map(o => ({ ...o }));
    },
    success() {
      const query = {};
      if(true) {
              this.labels.forEach(d => {
        if (!d.options) {
          if (typeof d.types === "string") {
            query[d.types] = d.value;
          } else {
            for (const key in d.types) {
              query[d.types[key]] = d[d.types[key]];
            }
            query[d.types.value] = d.value;
          }
        } else {
          for (const key in d.types) {
            query[d.types[key]] = d.options.find(v => v.code === d.value)[key];
          }
        }
      });
      if (!query.id) {
        query.id = "";
      }
      console.log(query);

      this.addEditApi(query);
      this.show(false);
      this.acquire({ pageNumber: this.page, pageSize: 15 });
      this.labels = this.prompt.map(o => ({ ...o }));
      }
    },
    info() {
      this.show(false);
      this.labels = this.prompt.map(o => ({ ...o }));
    }
  }
};
</script>

<style lang="stylus" scoped>
.prompt
  position fixed
  z-index 100
  top 50%
  left 50%
  transform translate(-50%,-50%)
  width 700px
  background #fff
  border 1px solid #ccc
  header
    background #409EFF
    color #ffffff
    padding 0 20px
    display flex
    justify-content space-between
    align-items center
    height 40px
    margin-bottom 20px
    i
      cursor pointer
  main
    padding 0 20px
    display flex
    flex-wrap wrap
    justify-content space-between
    margin-bottom 250px
    &>div
      margin-bottom 10px
  footer
    padding 0 20px
    display flex
    justify-content flex-end
    margin-bottom 10px
</style>