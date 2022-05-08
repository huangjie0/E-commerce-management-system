<template>
  <div>
      <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
        <el-row :gutter="30">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>    
            </el-col>
            <el-col :span="4">
                <el-button type="primary">
                    添加用户
                </el-button>
            </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
import userGet from '../api/Users/index'
export default {
    name:'User',
    data() {
        return {
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:2
            },
            input:'',
            userList:[],
            total:0
        }
    },
    created(){
        userGet('users',{ params:this.queryInfo }).then(res=>{
            if(!res.data.meta.status==200) return this.$message.error('获取用户列表失败')
            this.userList=res.data.data.users
            this.total=res.data.data.total
        })
    }
}
</script>

<style lang='less' scoped>

</style>