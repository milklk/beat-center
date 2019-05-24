<template>
  <div class="home" ref="home">
    <section class="left">
      <ul>
        <li></li>
        <li></li>
      </ul>
    </section>
    <section class="right">
      <ul>
        <li>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </li>
        <li></li>
        <li class="data-echarts" ref="dataEcharts"></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {
    function getDay(day) {
      let today = new Date();
      let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds);
      let tYear = today.getFullYear();
      let tMonth = today.getMonth();
      let tDate = today.getDate();
      tMonth = doHandleMonth(tMonth + 1);
      tDate = doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    }
    function doHandleMonth(month) {
      let m = month;
      if (month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    }
    const dataChart = this.$echarts.init(this.$refs.dataEcharts);
    // 指定图表的配置项和数据
    const dataOption = {
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["案件", "人员", "情报"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          getDay(-6),
          getDay(-5),
          getDay(-4),
          getDay(-3),
          getDay(-2),
          getDay(-1),
          getDay(0)
        ]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "案件",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "人员",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "情报",
          type: "line",
          stack: "总量",
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ]
    };
    dataChart.setOption(dataOption);
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.home
  box-sizing border-box
  height 100%
  width 100%
  padding 10px
  display flex
  justify-content space-around
  align-items center
  section
    height 100%
    ul
      width 100%
      height 100%
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      li 
        background #fff;
  .left
    width 32.3%
    background green
    li
      width 100%
      height 49%
  .right
    width 65.6%
    background red
</style>
