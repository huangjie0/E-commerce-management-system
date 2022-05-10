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
                <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
                </el-input>    
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="dialogVisible=true">
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
                    <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="showDeleteDialog(scope.row.id)"></el-button>
                    <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable='false'>
                         <el-button type="warning" size="mini" icon="el-icon-setting" @click="showDistributionDialog()"></el-button>
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
    <!-- 添加用户提示 -->
    <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="50%"
    @close="addDialogClosed"
    >
    <!-- 内容主体区 -->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
        </el-form-item>
         <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
        </el-form-item>
         <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
    </el-form>
    <!-- 底部区 -->
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
    title="修改用户"
    :visible.sync="editDialogVisible"
    width="50%"
    @close="editDialogClosed"
    >
        <!-- 修改用户的对话框 主页面-->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="用户名">
                <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
        </el-form>
        <!-- 邮箱验证 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email"></el-input>
            </el-form-item>
        </el-form>
        <!-- 手机号验证 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {userGet,userPut,userPost,userGetId,userPutEdit} from '../api/Users/index'
export default {
    name:'User',
    data() {
        //检验email
        var checkEmail = (rule,val,cb)=>{
            //定义表达式
            const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(regEmail.test(val)){
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }
        //检验手机号
        var checkMobile = (rule,val,cb)=>{
            const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if(regMobile.test(val)){
                return cb()
            }
            cb(new Error('请输入合法的手机号'))
        }
        return {
            //控制修改用户的显示与隐藏
            editDialogVisible:false,
            queryInfo:{
                query:'',
                //当前的页数
                pagenum:1,
                pagesize:5
            },
            userList:[],
            total:0,
            border:true,
            //控制添加对话框的显示与隐藏
            dialogVisible:false,
            //添加用户的表单数据
            addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            //添加表单验证规则
            addFormRules:{
                username:[
                    { required:true,message:'请输入用户名',trigger:'blur'},
                    {min:3,max:10,message:'用户名长度在3~10个字符之间',trigger:'blur'}
                ],
                password:[
                    { required:true,message:'请输入密码',trigger:'blur'},
                    {min:3,max:10,message:'用户名长度在6~15个字符之间',trigger:'blur'}
                ],
                email:[
                    { required:true,message:'请输入邮箱',trigger:'blur'},
                    {validator:checkEmail,trigger:'blur'}
                ],
                mobile:[
                    { required:true,message:'请输入手机',trigger:'blur'},
                    {validator:checkMobile,trigger:'blur'}
                ]
            },
            //添加校验规则
            editFormRules:{
                email:[
                    {required:true,message:'请输入用户邮箱',trigger:'blur'},
                    {validator:checkEmail,trigger:'blur'}
                ],
                mobile:[
                    {required:true,message:'请输入用户手机号',trigger:'blur'},
                    {validator:checkMobile,trigger:'blur'}
                ]
            },
            //查询到的用户对象
            editForm:{}
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
        //展示编辑对话框
        showEditDialog(id){
            this.editDialogVisible=true
            userGetId(`users/${id}`).then(res=>{
               if(res.data.meta.status!==200) return this.$message.error('查询学生列表失败')
                this.editForm = res.data.data
            })
        },
        //展示删除对话框
        async showDeleteDialog(id){
            //弹框询问
            const res= await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err=>err)
            //如果用户点击确定按钮confirm,取消是cancel
            console.log(res)
        },
        //展示设置对话框
        showDistributionDialog(){
            
        },
        //监听对话框关闭重置效果
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        getUserList(){
            userGet('users',{ params:this.queryInfo }).then(res=>{
            if(!res.data.meta.status==200) return this.$message.error('获取用户列表失败')
            this.userList=res.data.data.users
            this.total=res.data.data.total
        })
        },
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
        },
        //监听开关状态改变
        userStateChange(userinfo){
            userPut(`users/${userinfo.id}/state/${userinfo.mg_state}`).then(res=>{
                 if(!res.data.meta.status==200){
                 userinfo.mg_state=!userinfo.mg_state
                 return this.$message.error('更新用户状态失败')
                 }
                 this.$message.success('更新用户状态成功')
            })
        },
        //点击按钮新增用户
        addUser(){
            this.$refs.addFormRef.validate(valid=>{
                if(!valid) return
                //可以发起请求
                userPost('users',this.addForm).then(res=>{
                    if(res.data.meta.status!==201) {
                        this.$message.error('添加用户失败')
                    }
                    this.$message.success('添加用户成功')
                    //添加成功后隐藏用户对话框
                    this.dialogVisible=false
                    this.getUserList()
                })
            })
        },
        //监听修改用户对话框关闭重置数据
        editDialogClosed(){
            //重置表单数据
            this.$refs.editFormRef.resetFields()
        },
        //点击编辑确定按钮，来与检验表单验证
        editUserInfo(){
            this.$refs.editFormRef.validate((valid)=>{
                if(!valid) return
                //发起修改用户的消息
                userPutEdit(`users/${this.editForm.id}`,{
                    email:this.editForm.email,
                    mobile:this.editForm.mobile
                }).then(res=>{
                    if(res.data.meta.status!==200) return this.$message.error('编辑用户失败')
                    //将对话框关闭
                    this.editDialogVisible=false
                    //重新调用获取函数
                    this.getUserList()
                    //提示用户更新成功
                    this.$message.success('更新用户成功');
                })
            })
        },
    },
}
</script>

<style lang='less' scoped>
</style>