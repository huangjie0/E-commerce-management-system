<template>
  <div>
      <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
        <el-row :gutter="30">
            <el-col :span="8">
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>    
            </el-col>
            <el-col :span="4">
                <el-button type="primary">
                    添加用户
                </el-button>
            </el-col>
        </el-row>
        <el-table :data="userList" stripe border >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="电话" prop="mobile"></el-table-column>
            <el-table-column label="角色" prop="role_name"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                    <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable='false'>
                         <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
         <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
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
                //当前的页数
                pagenum:1,
                pagesize:5
            },
            userList:[],
            total:0,
            border:true
        }
    },
    created(){
        userGet('users',{ params:this.queryInfo }).then(res=>{
            if(!res.data.meta.status==200) return this.$message.error('获取用户列表失败')
            this.userList=res.data.data.users
            this.total=res.data.data.total
        })
    },
    methods:{
        //监听pagesize改变的时间
        handleSizeChange(newSize){
           this.queryInfo.pagesize=newSize
           userGet('users',{ params:this.queryInfo }).then(res=>{
                if(!res.data.meta.status==200) return this.$message.error('获取用户列表失败')
                this.userList=res.data.data.users
                this.total=res.data.data.total
           }
           )
        },
        //监听页码值改变事件
        handleCurrentChange(newPage){
            this.queryInfo.pagenum=newPage
            userGet('users',{ params:this.queryInfo }).then(res=>{
                if(!res.data.meta.status==200) return this.$message.error('获取用户列表失败')
                this.userList=res.data.data.users
                this.total=res.data.data.total
            })
        }
    },
}
</script>

<style lang='less' scoped>
</style>