<template>
  <div class="crew">
    <Tab :name="'情报墙'" />
    <List v-if="!this.$route.query.value" :table="table" />
    <Detail v-else />
  </div>
</template>

<script>
import Tab from "../../components/tab";
import List from "../../components/list";
import Detail from "../../components/detail";
export default {
  name: "wall-manage",
  data() {
    return {
      table: [
        {
          name: '图表名称',
          value: 'name'
        },
        {
          name: '图表元素',
          value: 'element'
        },
        {
          name: '图表周期',
          value: 'time'
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
.crew
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