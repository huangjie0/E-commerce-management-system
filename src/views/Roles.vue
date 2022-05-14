<template>
  <div>
    <!-- 面包屑导航开始 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航结束 -->
    <!-- 卡片视图开始 -->
    <el-card>
        <!-- 添加角色按钮 -->
        <el-row>
            <el-col>
                <el-button type="primary">
                    添加角色
                </el-button>
            </el-col>
        </el-row>
        <!-- 添加角色按钮结束部分 -->
        <el-table :data=" rolesList" border stripe>
            <el-table-column type="index">

            </el-table-column>
            <el-table-column label="角色名称" prop="roleName">

            </el-table-column>
            <el-table-column label="角色描述" prop="roleDesc">

            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 卡片视图结束 -->
  </div>
</template>

<script>
import {rolesget} from '../api/roles/index.js'
export default {
    name:'Roles',
    data() {
        return {
            rolesList:[]
        }
    },
    created() {
        rolesget('roles').then(res=>{
            console.log(res)
            if(res.data.meta.status !== 200) return this.$message.error('获取角色列表失败')
            this.rolesList = res.data.data
        })
    },
}
</script>

<style lang='less' scoped>

</style>