<template>
  <div class="home" ref="home">
    <section class="left">
      <ul>
        <li ref="statisticsData"></li>
        <li class="study">
          <ul>
            <li>
              <dl>
                <dt style="font-size:18px;font-weight:700">本月研判统计</dt>
                <dd>
                  <span style="color:#2AB9D0;font-size:31px;">333333333</span>
                  <br>
                  <br>本月研判总人数
                </dd>
              </dl>
            </li>
            <li ref="studyData"></li>
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
                <li>
                  <dl>
                    <dt>案件总数：</dt>
                    <dd>
                      <span style="color:#2AB9D0;font-size:20px;">222</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>人员总数：</dt>
                    <dd>
                      <span style="color:#2AB9D0;font-size:20px;">222</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>情报总数：</dt>
                    <dd>
                      <span style="color:#2AB9D0;font-size:20px;">222</span>
                    </dd>
                  </dl>
                </li>
              </ul>
            </li>
            <li class="datas-bar" ref="compare"></li>
          </ul>
        </li>
        <li class="datas-line" ref="trend"></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  components: {},
  computed: {},
  mounted() {
    const statisticsChart = () => {
      const statisticsData = this.$echarts.init(this.$refs.statisticsData)
      const statisticsOption = {
        title: {
          text: '本月数据统计'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          top: '90%',
          data: ['案件', '人员', '情报']
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '案件' },
              { value: 310, name: '人员' },
              { value: 234, name: '情报' }
            ],
            label: {
              show: false
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      statisticsData.setOption(statisticsOption)
    }
    statisticsChart()
    const studyChart = () => {
      const studyData = this.$echarts.init(this.$refs.studyData)
      const studyOption = {
        grid: {
          bottom: '20%',
          top: '2%',
          right: '5%',
          left: '5%'
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
          data: [
            '4-12',
            '5-12',
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            '5-17'
          ],

          axisLine: {
            lineStyle: {
              color: 'tranparent'
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
              color: 'transparent',
              fontSize: 0
            }
          },
          axisLine: {
            lineStyle: {
              color: 'transparent'
            }
          }
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: 12
          },
          formatter: '{b}:{c}'
        },
        series: {
          type: 'bar',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#00d386' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#0076fc' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              barBorderRadius: 15
            }
          },
          data: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30
          ]
        }
      }

      studyData.setOption(studyOption)
    }
    studyChart()
    const compareChart = () => {
      const compare = this.$echarts.init(this.$refs.compare)
      const compareOption = {
        title: {
          text: '本年数据比较'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a0}:{c0}<br>{a1}:{c1}<br>{a2}:{c2}'
        },
        legend: {
          data: ['案件', '人员', '情报']
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '10%'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#000'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            data: [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#000'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '案件',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390]
          },
          {
            name: '人员',
            type: 'bar',
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
          },
          {
            name: '情报',
            type: 'bar',
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
          }
        ]
      }
      compare.setOption(compareOption)
    }
    compareChart()
    const trendChart = () => {
      const trend = this.$echarts.init(this.$refs.trend)
      const trendOption = {
        title: {
          text: '本年数据趋势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: '{b}:{c}'
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: '#000'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            data: [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#000'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],

        series: [
          {
            name: '数据',
            type: 'line',
            lineStyle: {
              color: '#70D1E0'
            },
            itemStyle: {
              color: '#fd'
            },
            areaStyle: {
              color: '#D3F0F5'
            },
            data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
          }
        ]
      }
      trend.setOption(trendOption)
    }
    trendChart()
  }
}
</script>

<style lang="stylus" scoped>
.home
  box-sizing border-box
  height 100%
  width 100%
  padding 20px
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

    .study
      ul
        li:nth-child(1)
          position relative

        dd
          text-align center
          position absolute
          left 50%
          bottom 0
          transform translate(-50%, 0)

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

    .datas-bar
      height 74%
      padding 20px
      box-sizing border-box

    &>ul>li:nth-child(1)
      background transparent
      padding 0
</style>
