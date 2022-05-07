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
      <el-aside width="200px">
          <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#81c0c3"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标1 -->
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <!-- 二级菜单 -->
            <el-submenu index="1-4-1">
              <template slot="title">
              <!-- 图标2 -->
              <i class="el-icon-location"></i>
              <span>导航一</span>
              </template>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边内容 -->
      <el-main>11111</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name:'Common',
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
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
}
.el-main {
  background-color: #e0e1e2;
}
.home-container {
  height: 100%;
}
</style>