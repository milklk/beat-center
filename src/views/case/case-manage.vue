<template>
  <div class="case">
    <Tab :name="'案件'" />
    <List v-if="!this.$route.query.id" :table="table" />
    <Detail v-else />
  </div>
</template>

<script>
import Tab from "../../components/tab";
import List from "../../components/list";
import Detail from "../../components/detail";
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
          name: "缴获毒品类型",
          value: "drugName"
        },
        {
          name: "缴获毒品数量",
          value: "drugNumber"
        },
        {
          name: "案件类型",
          value: "crew"
        },
        {
          name: "案件区域",
          value: "area"
        },
        {
          name: "案件时间",
          value: "drugNumber"
        }
      ]
    };
  },
  components: {
    Tab,
    List,
    Detail
  },
  computed: {},
  mounted() {},
  methods: {}
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