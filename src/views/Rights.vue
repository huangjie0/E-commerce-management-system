<template>
  <div>
    <!-- 面包屑导航开始 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航结束 -->

    <!-- 卡片视图开始 -->
    <el-card>
        <el-table :data="rightsList" border stripe > 
          <el-table-column type="index"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="level">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level == '0'">一级</el-tag>
              <el-tag type="success" v-else-if="scope.row.level =='1' ">二级</el-tag>
              <el-tag type="warning" v-else>三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <!-- 卡片视图结束部分 -->
  </div>
</template>

<script>
import { rightsget } from '../api/roles/index'
export default {
    name:'Rights',
    data() {
      return {
        //所有的权限列表
        rightsList:[]
      }
    },
    //在生命周期创建的时候发请求
    created(){
      rightsget(`rights/list`).then(res=>{
        if(res.data.meta.status!==200) return this.$message.error('获取权限列表失败')
        this.rightsList = res.data.data
      })
    },
}
</script>

<style lang='less' scoped>
</style>