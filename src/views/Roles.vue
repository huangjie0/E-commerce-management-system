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
            <!-- 展开列 -->
            <el-table-column type="expand"> 
                <template slot-scope="scope">
                    <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['dbbuttom',i1==0 ?'dbtop':'','vcenter']">
                        <!-- 渲染一级权限 -->
                        <el-col :span="5">
                            <el-tag closable  @close="removeRightById(scope.row,item1.id)" type="">
                                {{item1.authName}}
                            </el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <!-- 渲染二级和三级权限 -->
                        <el-col :span="19">
                            <!-- 通过for循环渲染二级三级权限 -->
                            <el-row :class="[i2==0 ? '' :'dbtop']" v-for="(item2,i2) in item1.children" :key="item2.id">
                              <el-col :span="6">
                                  <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">
                                      {{item2.authName}}
                                  </el-tag>
                                   <i class="el-icon-caret-right"></i>
                              </el-col>
                              <el-col :span="18">
                                <el-tag type='warning'  @close="removeRightById(scope.row,item3.id)" closable v-for="(item3,i3) in item2.children" :key="item3.id">
                                    {{item3.authName}}
                                </el-tag>
                              </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <!-- 索引列 -->
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
                    <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 卡片视图结束 -->
    <!-- 分配权限 -->
    <el-dialog
    title="分配权限"
    :visible.sync="setRightDialogVisible"
    width="50%"
    @close="setRightDialogClosed()"
    >
    <!-- 树形控件 -->
    <el-tree :data="rightList" :props="treeProps" show-checkbox="" node-key="id" default-expand-all 
   :default-checked-keys='defKeys' ref="treeRef"></el-tree>
    <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights()">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import {rolesget,rolesdelete,rolespost} from '../api/roles/index.js'
export default {
    name:'Roles',
    data() {
        return {
            //默认选中节点id值数组
            defKeys:[],
            rolesList:[],
            // 控制分配权限的对话框显示与隐藏
            setRightDialogVisible:false,
            //所有权限数据
            rightList:[],
            //树形控件
            treeProps:{
                label:'authName',
                children:'children', 
            },
            //即将分配权限ID
            roleId:''
        }
    },
    created() {
        rolesget('roles').then(res=>{
            if(res.data.meta.status !== 200) return this.$message.error('获取角色列表失败')
            this.rolesList = res.data.data
        })
    },
    methods: {
        // 点击为角色分配权限
        allotRights(){
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedNodes()
            ];
            const idStr = keys.join(',')
            rolespost(`roles/${this.roleId}/rights`,{rids:idStr}).then(res=>{
               if(res.data.meta.status!==200){
                   return this.$message.error('更新权限失败')
               }
               this.$message.success('更新用户权限成功')
            //刷新列表
             rolesget('roles').then(res=>{
                if(res.data.meta.status !== 200) return this.$message.error('获取角色列表失败')
                this.rolesList = res.data.data
            })
            this.setRightDialogVisible=false
            })
        },
        //监听分配权限对话框的关闭事件
        setRightDialogClosed(){
            this.defKeys = []
        },
        //展示分配权限的对话框
        showSetRightDialog(role){
            this.roleId = role.id
            //获取权限的数据
            rolesget('rights/tree').then(res=>{
                if(res.data.meta.status!==200){
                    return this.$message.error('获取权限列表失败');
                }
                //获取到的权限数据保存到data中
                this.rightList = res.data.data
            })
            //获取三级节点的id
            this.getLeafKeys(role, this.defKeys)


            this.setRightDialogVisible=true
        },
        async removeRightById(role,rightId){
        //弹框提示用户是否删除
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err=>err)

        if(confirmResult !=='confirm'){
            return this.$message.info('取消删除')
        }
        rolesdelete(`roles/${role.id}/rights/${rightId}`).then(res=>{
            if(res.data.meta.status!==200) {return this.$message.error('删除权限失败')}
            role.children = res.data.data
        })
        },
        //通过递归获取权限id
        getLeafKeys(node,arr){
            if(!node.children){
                return arr.push(node.id)
            }
            node.children.forEach(item=>{
                this.getLeafKeys(item,arr)
            })
        }
    },
}
</script>

<style lang='less' scoped>
.el-tag{
    margin: 7px;
}
.dbtop{
    border-top: 1px solid rgb(182, 182, 182);
}
.dbbuttom{
    border-bottom:1px solid rgb(182, 182, 182);
}
.vcenter{
    display: flex;
    align-items: center;
}
</style>