<template>
    <svg width="100%" height="98%" id="force">
        <g v-if="edges.length">
            <g v-for="(item, index) in edges" :key="index" class="edge">
                <line class="edgeLine" stroke-width="3" :stroke="item.rel === '亲属关系' ? 'red' : item.rel === '朋友关系' ? 'blue' : 'black' "></line>
                <text class="edgeTitle" text-anchor="middle" dominant-baseline="middle">{{item.relation}}</text>
            </g>
        </g>
        <g v-if="nodes.length">
            <g v-for="(item, index) in nodes" :key="item.name" class="node">
                <circle :r="item.name === $route.query.name ? nodeR :r" :fill="`url(#${item.name})`" class="nodeCircle" @click="addSec(item.name,svg)"></circle>
                <Pie :innerR="item.name === $route.query.name ? nodeR :r" :outerR="item.name !== $route.query.name ? 60 :70" :i="index"/>
                <g>
                    <text text-anchor="middle" class="nodeTitle" font-size="16" dominant-baseline="middle">{{item.name}}</text>
                </g>
                <defs>
                    <pattern :id="item.name"  height="1" width="1">
                        <image x="-7" y="-20" height="100" width="100" :href="item.image" class="nodeImg"></image>
                    </pattern>
                </defs>

            </g>
        </g>
    </svg>
</template>

<script>
    import * as d3 from 'd3'

    import Pie from '../pie'
    export default {
        name: "force",
        data () {
            return {
                r: 30,
                nodeR: 40
            }
        },
        components: {
          Pie
        },
        props: {
            nodes: Array,
            edges: Array,
            addSec: Function,
            path: String
        },
        watch: {
            '$route' ()  {
                if (this.$route.path === this.path) {
                 setTimeout(() => {
                     this.$nextTick(() => {
                         this.svg()
                     })
                 },200)
             }
            }
        },
        mounted () {
                //数据
               this.svg = () => {
                   const nodes = this.nodes
                   const edges = this.edges
                   const r = this.r
                   const force = document.getElementById('force')
                   const width = force.clientWidth
                   const height = force.clientHeight

                   //创建Force布局
                   const forceLayout = d3.select('#force')
                   const Force = d3.forceSimulation(nodes)
                       .force("charge", d3.forceManyBody().strength(-5000))
                       .force("center", d3.forceCenter(width / 2, (height) / 2))

                   edges ? Force.force("link", d3.forceLink().id((d) => d.name).links(edges).distance(200)) : ''

                   // 圆形图片节点（人物）
                   if (nodes.length) {
                       // var nodeLayout = forceLayout.selectAll('.node').data(nodes)
                       var nodeCircle = forceLayout.selectAll('.nodeCircle').data(nodes)
                       var nodeTitle = forceLayout.selectAll('.nodeTitle').data(nodes)
                           .attr('fill-opacity',1)
                           // .attr('fill-opacity', (d) => d.name === this.$route.query.name ? 1 : 0)
                       nodeCircle.call(d3.drag()
                           .on("start",started)
                           .on("drag",dragged)
                           .on("end",ended)
                       )
                       //三弧装饰
                       var nodePie = forceLayout.selectAll('.pie').data(nodes)
                           .attr('fill-opacity',1)
                           // .attr('fill-opacity', (d) => d.name === this.$route.query.name ? 1 : 0)

                       //节点鼠标事件
                   //     nodeCircle.on('mouseover',(d, i) => {
                   //         // nodePie.filter((pieD, PieI) => i === PieI)
                   //         //     .attr('fill-opacity',1)
                   //         // nodeTitle.filter((titleD, titleI) => i === titleI)
                   //         //     .attr('fill-opacity',1)
                   //     })
                   //     nodeLayout.on('mouseleave', () => {
                   //         // nodePie.attr('fill-opacity', (d) => d.name === this.$route.query.name ? 1 : 0)
                   //         // nodeTitle.attr('fill-opacity',(d) => d.name === this.$route.query.name ? 1 : 0)
                   //     })
                   }

                   //连线(关系)
                   if (edges.length) {
                       var edgeLine = forceLayout.selectAll('.edgeLine').data(edges)
                       var edgeTitle = forceLayout.selectAll('.edgeTitle').data(edges)
                   }

                   Force.on('tick',  () => {
                       //限制结点的边界
                       nodes.forEach((d) => {
                           d.x = d.x - r -16 -19 < 0     ? r +16 + 19 : d.x
                           d.x = d.x + r +16 + 19> width ? width - r -16 -19 : d.x
                           d.y = d.y - r -16 -19< 0      ? r +16 + 19 : d.y
                           d.y = d.y + r +16 + 19 > height ? height - r -16 -19 : d.y
                       })
                       
                       //更新连接线位置
                       if (edges.length) {
                           
                           edgeLine
                               .attr('x1',  (d) => d.source.x)
                               .attr('y1', (d) => d.source.y )
                               .attr('x2', (d) => d.target.x )
                               .attr('y2', (d) => d.target.y)
                               .attr("stroke-dasharray",function(d){
                                   const linkWidth = Math.sqrt((d.source.y - d.target.y) ** 2 + (d.source.x - d.target.x) ** 2)
                                   const dash = (linkWidth - 50) / 2
                                   return `${dash},50,${dash}`;
                               })

                           edgeTitle
                               .attr('x', (d) => ((d.source.x + d.target.x) / 2))
                               .attr('y', (d) => ((d.source.y + d.target.y) / 2))
                               .attr('transform', (d) => {
                                   const tan = Number((d.source.y - d.target.y) / (d.source.x - d.target.x))
                                   const deg = Math.atan(tan) * 180 / Math.PI
                                   return `rotate(${deg} ${(d.source.x + d.target.x) / 2} ${(d.source.y + d.target.y) / 2})`
                               })
                       }

                       //更新节点位置
                       if (nodes.length) {
                           nodeCircle
                               .attr('cx', (d) => d.x
                               )
                               .attr('cy',(d) => d.y)
                           nodeTitle
                               .attr('x',(d) =>d.x)
                               .attr('y',(d) => d.name === this.$route.query.name ? d.y + this.nodeR + 16 :  d.y + r + 16)
                           nodePie.attr('transform', (d) => `translate(${d.x},${d.y})`)
                       }

                   })
                   function started(d){
                       if(!d3.event.active){
                           Force.alphaTarget(0.8).restart()
                       }
                       d.fx = d.x;
                       d.fy = d.y;
                   }
                   function dragged(d){
                       d.fx = d3.event.x;
                       d.fy = d3.event.y;

                   }
                   function ended(d){
                       if(!d3.event.active){
                           Force.alphaTarget(0);
                       }
                       d.fx = null;
                       d.fy = null;
                   }
               }
               this.svg()
        }
    }
</script>

<style scoped lang="stylus">

</style>