<template>
   <div
        v-loading="loading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(256, 256, 256, 1)"
        class="relationMain"
   >
       <Force
               :nodes = "persons"
               :edges = "rels"
               :addSec = "addSec"
               :path = "path"
               v-if="persons.length || rels.length"
       />
       <!--<HT-->
            <!--:nodes="persons"-->
            <!--:edges="rels"-->
            <!--:path = "path"-->
            <!--:addSec = "addSec"-->
            <!--v-if="persons.length || rels.length"-->
       <!--/>-->
   </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Force from '../force'
    import HT from '../ht'
    export default {
        name: "relationMain",
        data () {
            return {
                loading: true,
                path: '/relation'
            }
        },
        components: {
            HT,
            Force
        },
        computed: {
            ...mapGetters('relation',{
                rels: 'getRels',
                persons: 'getPersons'
            })
        },
        watch: {
          '$route' () {
              this.loading = true
              setTimeout(() => {
                  const name = this.$route.query.name
                  const rel = this.$route.query.rel
                  this.$store.commit('relation/get_rels', {name, rel})
                  this.$store.commit('relation/get_parsons', {name})
              },200)
              setTimeout(() => this.loading = false,1000)
          }
        },
        methods: {
            addSec (sec,svg) {
                this.loading = true
                setTimeout(() => this.loading = false,1000)
                setTimeout(() => {
                    const name = this.$route.query.name
                    const rel = this.$route.query.rel
                    this.$store.commit('relation/get_rels', {name, rel,sec})
                    this.$store.commit('relation/get_parsons', {name})
                    this.$nextTick(() => svg())
                },200)
            }
        },
        mounted () {
                setTimeout (() => {
                    this.$store.dispatch('relation/getRelation',{name: this.$route.query.name,rel: this.$route.query.rel}).then(() => {
                        setTimeout(() => this.loading = false,1000)
                    })
                },200)
        }
    }
</script>

<style scoped lang="stylus">
    .relationMain
        width 100%
        height 100%
</style>