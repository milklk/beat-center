<template>
  <Analyze :dataPie="dataPie" :dataBar="dataBar" />
</template>

<script>
import Analyze from "../components/analyze";
import { getCode } from "../api";
export default {
  name: "home",
  data() {
    return {
      dataPie: {
        title: "本月数据统计",
        legend: ["案件", "人员", "情报"],
        data: [
          { value: 335, name: "案件" },
          { value: 310, name: "人员" },
          { value: 234, name: "情报" }
        ]
      },
      dataBar: {
        title: '本月研判统计',
        subhead: "本月研判总人数",
        legend: [
          "2019-05-01",
          "2019-05-02",
          "2019-05-03",
          "2019-05-04",
          "2019-05-05",
          "2019-05-06",
          "2019-05-07",
          "2019-05-08",
          "2019-05-09",
          "2019-05-10",
          "2019-05-11",
          "2019-05-12",
          "2019-05-13",
          "2019-05-14",
          "2019-05-15",
          "2019-05-16",
          "2019-05-17",
          "2019-05-18",
          "2019-05-19",
          "2019-05-20",
          "2019-05-21",
          "2019-05-22",
          "2019-05-23",
          "2019-05-24",
          "2019-05-25",
          "2019-05-26",
          "2019-05-27",
          "2019-05-28",
          "2019-05-29",
          "2019-05-30",
          "2019-05-31"
        ],
        data: [
          122,
          124,
          156,
          90,
          123,
          145,
          167,
          189,
          200,
          124,
          122,
          124,
          156,
          90,
          123,
          145,
          167,
          189,
          200,
          124,
          122,
          124,
          156,
          90,
          123,
          145,
          167,
          189,
          200,
          124,
          214
        ]
      },
      dataAll: [],
      dataCompare: {},
      dataTrend: {}
    };
  },
  components: {
    Analyze
  },
  computed: {},
  async mounted() {
    const token = await getCode();
  }
};
</script>

<style lang="stylus" scoped></style>
