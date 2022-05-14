<template>
  <div>
      <!-- 面包屑导航开始 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航结束 -->

  </div>
</template>

<script>
export default {
    name:'Rights',

}
</script>

<style lang='less' scoped>
</style>