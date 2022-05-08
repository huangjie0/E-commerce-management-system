<template>
  <el-container class="home-container">
    <!-- 页面头部区域 -->
    <el-header>
      <div>
        <img src="../assets/user.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体部分 -->
    <el-container>
      <!-- 侧边栏 -->
     
      <el-aside :width="iscollapse ? '64px' :'200px'">
         <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
          <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#81c0c3"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened='true'
          :collapse='iscollapse'
          :collapse-transition='false'
          router
          :default-active="activePath"
        >
        <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menusList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标1 -->
              <i :class="iconsObjs[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id" 
            @click="saveNavState('/'+subitem.path)">
              <template slot="title">
              <!-- 图标2 -->
              <i class="el-icon-menu"></i>
              <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import homeGet from '../api/home/index'
export default {
  data() {
    return {
      //放置一级菜单
      menusList:[],
      iconsObjs:{
        '125':'el-icon-s-custom',
        '103':'el-icon-date',
        '101':'el-icon-folder-opened',
        '102':'el-icon-tickets',
        '145':'el-icon-coin',
      },
      iscollapse:false,
      //被激活的链接储存起来
      activePath:''
    }
  },
  name:'Common',
  //在页面加载中发请求
  created(){
     homeGet('menus').then(res=>{
      if(res.data.meta.status!==200) return this.$message.error(res.data.meta.msg)
      this.menusList=res.data.data
     }),
     this.activePath=window.sessionStorage.getItem('activePath')
  },
  methods: {
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleCollapse(){
      this.iscollapse=!this.iscollapse
    }
    },
};
</script>

<style scoped lang='less'>
.el-header {
  background-color: cadetblue;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    width: 215px;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 18px;
    span {
      margin-left: 8px;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
.el-aside {
  background-color: rgb(120, 186, 189);
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #e0e1e2;
}
.home-container {
  height: 100%;
}
.toggle-button{
  background-color: aquamarine;
  font-size: 10px;
  line-height: 30px;
  text-align: center;
  color: white;
  cursor: pointer;
}
</style>