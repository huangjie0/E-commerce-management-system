<template>
  <div>
        <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary" @click="showAddCateDialog()">
                    添加分类
                </el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <tree-table :data='cateList' :columns='columns' :selection-type="false" :expand-type="false" 
        show-index index-text="#" border :show-row-hover="false">
            <template slot="isok" slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.cat_deleted==false" style="color:lightgreen;"></i>
                <i class="el-icon-error" v-else style="color:red;"></i>
            </template>
            <!-- 排序 -->
            <template slot="order" slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.cat_level==0">一级</el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.cat_level==1">二级</el-tag>
                <el-tag type="warning" size="mini" v-else>三级</el-tag>
            </template>
            <!-- 操作 -->
            <template slot="opt" slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
        </tree-table>
        <!-- 分页区域 -->
         <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog
    title="添加分类"
    :visible.sync="addCateDialogVisible"
    width="50%">
    <!-- form表单验证 -->
    <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称:" prop="cat_name">
            <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
         <el-form-item label="父级分类:">
             <el-cascader
            v-model="selectedKeys"
            :options=" parentCateList"
            :props="cascaderProps"
            @change="handleChange"
            clearable 
            >
            </el-cascader>
        </el-form-item>
    </el-form>
    <!-- form表单验证结束 -->
    <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateDialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
     <!-- 添加分类的对话框结束 -->
  </div>
</template>

<script>
import { categet } from '../api/Cate/index'
export default {
    name:'Cate',
    created() {
        categet('categories',{params:this.queryInfo}).then(res=>{
            if(res.data.meta.status!==200){
                return this.$message('获取商品分类失败')
            }
            this.cateList = res.data.data.result
            //为总数条数赋值
            this.total = res.data.data.total
        })
    },
    methods:{
        //级联选择发生变化所触发的函数
        handleChange(){
            console.log(this.selectedKeys);
        },
        //添加按钮的点击事件
        showAddCateDialog(){
            this.getParentCateList()
            this.addCateDialogVisible=!this.addCateDialogVisible
        },
        // 监听pagesize事件
        handleSizeChange(newSize){
            //将最新数据赋值给pagesize属性中
            this.queryInfo.pagesize = newSize
            //重新发起get请求
            categet('categories',{params:this.queryInfo}).then(res=>{
                if(res.data.meta.status!==200){
                    return this.$message('获取商品分类失败')
                }
                this.cateList = res.data.data.result
                //为总数条数赋值
                this.total = res.data.data.total
            })
        },
        //监听pagenum改变的回调函数
        handleCurrentChange(newPage){
            //重新赋值给pagenum里面的值
            this.queryInfo.pagenum=newPage
            //再次发请求给服务器重新渲染页面
            categet('categories',{params:this.queryInfo}).then(res=>{
                if(res.data.meta.status!==200){
                    return this.$message('获取商品分类失败')
                }
                this.cateList = res.data.data.result
                //为总数条数赋值
                this.total = res.data.data.total
            })
        },
        getParentCateList(){
            categet('categories',{params:{
                type:2
            }}).then(res=>{
                if(res.data.meta.status!==200) this.$message.error('获取二级菜单失败')
                this.$message.success('获取二级菜单成功!')
                this.parentCateList = res.data.data
            })
        }
    },
    data() {
        return {
            //选中的父级分类id数组
            selectedKeys:[],
            cascaderProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children'
            },
            parentCateList:[],
            //添加分类的表单数据对象
            addCateForm:{
                //将要添加的分类名称
                cat_name:"",
                //添加父级id，默认的等级是一级id
                cat_pid:0,
                //添加分类层级,默认是一级分类 
                cat_level:0, 
            },
            //定义添加表单验证规则的对象
            addCateFormRules:{
               cat_name:[
                   {
                       required:true,
                       message:'请输入分类名称',
                       trigger:'blur'
                   }
               ]
            },
            //控制添加对话框的显示与隐藏
            addCateDialogVisible:false,
            //商品分类的数据，默认是空
            cateList:[],
            //查询条件
            queryInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            total:0,
            columns:[
                {label:'分类名称',
                prop:'cat_name'
                },
                {label:'是否有效',
                //将当前列定义为模板列
                type:'template',
                template:'isok',
                },
                {
                label:"排序",
                type:'template',
                template:'order'
                },
                {
                label:'操作',
                type:'template',
                template:'opt'
                }
            ]
        }
    },
}
</script>

<style scoped lang='less'> 
.el-cascader{
    width: 100%;
}
</style>