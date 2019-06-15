<template>
  <div class="analyze">
    <section class="left">
      <ul>
        <li ref="dataPie"></li>
        <li class="dataBar">
          <ul>
            <li>
              <dl>
                <dt style="font-size:18px;font-weight:700">
                  {{ dataBar.title }}
                </dt>
                <dd>
                  <span>{{ dataBar.data.reduce((a, b) => a + b, 0) }}</span>
                  <br />
                  <br />{{ dataBar.subhead }}
                </dd>
              </dl>
            </li>
            <li ref="dataBar"></li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="right">
      <ul>
        <li class="top">
          <ul>
            <li class="all-datas">
              <ul>
                <li v-for="item in dataAll" :key="item.name">
                  <dl>
                    <dt>{{ item.name }}总数：</dt>
                    <dd>
                      <span>{{ item.value }}</span>
                    </dd>
                  </dl>
                </li>
              </ul>
            </li>
            <li class="data-compare" ref="compare"></li>
          </ul>
        </li>
        <li class="data-trend" ref="trend"></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "analyze",
  data() {
    return {};
  },
  props: {
    dataPie: Object,
    dataBar: Object,
    dataAll: Array,
    dataCompare: Object,
    dataTrend: Object
  },
  components: {},
  computed: {},
  mounted() {
    const dataPie = this.dataPie;
    const dataBar = this.dataBar;
    const dataAll = this.dataAll;
    const dataCompare = this.dataCompare;
    const dataTrend = this.dataTrend;
    const dataPieChart = () => {
      const dataPieChart = this.$echarts.init(this.$refs.dataPie);
      const dataPieOption = {
        title: {
          text: dataPie.title
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          top: "90%",
          data: dataPie.legend
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            data: dataPie.data,
            label: {
              show: false
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      dataPieChart.setOption(dataPieOption);
    };
    dataPieChart();
    const dataBarChart = () => {
      const dataBarChart = this.$echarts.init(this.$refs.dataBar);
      const dataBarOption = {
        grid: {
          bottom: "20%",
          top: "2%",
          right: "5%",
          left: "5%"
        },
        xAxis: {
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          data: dataBar.xAxis,
          axisLine: {
            lineStyle: {
              color: "tranparent"
            }
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "transparent",
              fontSize: 0
            }
          },
          axisLine: {
            lineStyle: {
              color: "transparent"
            }
          }
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 12
          },
          formatter: "{b}:{c}"
        },
        series: {
          type: "bar",
          itemStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#00d386"
                  },
                  {
                    offset: 1,
                    color: "#0076fc"
                  }
                ],
                globalCoord: false
              },
              barBorderRadius: 15
            }
          },
          data: dataBar.data
        }
      };

      dataBarChart.setOption(dataBarOption);
    };
    dataBarChart();
    const compareChart = () => {
      const compare = this.$echarts.init(this.$refs.compare);
      const compareOption = {
        title: {
          text: dataCompare.title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{a0}:{c0}<br>{a1}:{c1}<br>{a2}:{c2}"
        },
        legend: {
          data: dataCompare.legend
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "10%"
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#000"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            data: dataCompare.xAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#000"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: dataCompare.data.map(d => ({
          type: "bar",
          name: d.name,
          data: d.value
        }))
      };
      compare.setOption(compareOption);
    };
    compareChart();
    const trendChart = () => {
      const trend = this.$echarts.init(this.$refs.trend);
      const trendOption = {
        title: {
          text: dataTrend.title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          formatter: "{b}:{c}"
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "#000"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            data: dataTrend.xAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#000"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            splitLine: {
              show: false
            }
          }
        ],

        series: [
          {
            name: dataTrend.data.name,
            type: "line",
            lineStyle: {
              color: "#70D1E0"
            },
            itemStyle: {
              color: "#fd"
            },
            areaStyle: {
              color: "#D3F0F5"
            },
            data: dataTrend.data.value
          }
        ]
      };
      trend.setOption(trendOption);
    };
    trendChart();
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.analyze
  box-sizing border-box
  height 100%
  width 100%
  display flex
  justify-content space-between
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
        background #fff
        width 100%
    &>ul
      &>li
        background #fff
        width 100%
        padding 20px
        box-sizing border-box
      li:nth-child(1)
        height 54%
      li:nth-child(2)
        height 44%
  .left
    width 33%
    .dataBar
      ul
        li:nth-child(1)
          position relative
        dd
          text-align center
          position absolute
          left 50%
          bottom 0
          transform translate(-50%,0)
          span
            color #2AB9D0
            font-size 31px
  .right
    width 66.3%
    .all-datas
      height 23%
      background transparent
      ul
        height 100%
        flex-direction row
        li
          width 32.8%
          height 100%
          box-sizing border-box
          padding 5px 10px
          dl
            width 100%
            height 100%
            display flex
            flex-direction column
            justify-content space-around
            dd
              margin-left 10px
            span
              color #2AB9D0
              font-size 24px
    .data-compare
      height 74%
      padding 20px
      box-sizing border-box
    &>ul>li:nth-child(1)
      background transparent
      padding 0
</style>