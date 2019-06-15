<template>
  <div class="crew">
    <List v-if="!this.$route.query.id"/>
    <Detail v-else/>
  </div>
</template>

<script>
import List from "../../components/list";
import Detail from "../../components/detail";
export default {
  name: "crew-manage",
  data() {
    return {};
  },
  components: {
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
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
</style>