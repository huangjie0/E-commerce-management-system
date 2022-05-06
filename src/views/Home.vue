<template>
<el-container>
    <!-- 页面头部区域 -->
    <el-header>
        <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体部分 -->
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 右边内容 -->
        <el-main>Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    name:'Home',
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        }
    }

}
</script>

<style scoped lang='less'>
</style>