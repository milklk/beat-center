<template>
  <div class="crew">
    <Tab :name="'人员'" />
    <List v-if="!this.$route.query.id"/>
    <Detail v-else/>
  </div>
</template>

<script>
import Tab from "../../components/tab";
import List from "../../components/list";
import Detail from "../../components/detail";
export default {
  name: "crew-manage",
  data() {
    return {};
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