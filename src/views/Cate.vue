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
                <el-button type="primary">
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
        </tree-table>
        <!-- 分页区域 -->
    </el-card>
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
    data() {
        return {
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
                }
            ]
        }
    },


}
</script>

<style scoped lang='less'> 

</style>