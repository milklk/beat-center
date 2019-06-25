<template>
    <el-container class="relation">
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <RelationAside />
            </el-aside>
            <el-main>
                <RelationMain />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from '../../components/header'
    import RelationMain from '../../components/relation-main'
    import RelationAside from '../../components/relation-aside'

    export default {
        name: "relation",
        components: {
            Header,
            RelationAside,
            RelationMain
        }
    }

</script>

<style scoped lang="stylus">
    .relation
        width 100%
        height 100%
        overflow hidden
</style>