<template>
  <div class="login-container">
    <div class="div1">后台管理系统</div>
      <div class="login_box">
        <!-- 头像区域 -->
        <div class="portrait">
          <img src="../assets/logo.png">
        </div>
        <!-- 登录表单区域 -->
        <el-form ref="loginFormRef" label-width="0px" :model="loginForm" class="login_form" :rules="loginFormRules">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-s-tools" v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <!-- 按钮区 -->
          <el-form-item class="btns">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>

import  {loginPost} from '../api/request.js'
export default {
    name:'Login',
    data() {
      return {
        //登录数据表单的对象
        loginForm:{
          username:'',
          password:''
        },
        // 这是表单规则对象
        loginFormRules:{
          //用户名
          username:[
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          //密码
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      resetLoginForm(){
        //点击重置按钮,重置登录
        this.$refs.loginFormRef.resetField()
      },
      login(){
        this.$refs.loginFormRef.validate(async vaild=>{
          //如果是false直接返回结果
          if(!vaild) return 
          const res = await loginPost('login',this.loginForm)
          if(res.data.meta.status!==200) return this.$message.error('登录失败') 
          this.$message.success('登录成功')
          //将token保存到session里面
          window.sessionStorage.setItem('token',res.data.data.token);
          //跳转页面
          this.$router.push('/home')
        })
      }
    }
}
</script>

<style lang='less' scoped>
.div1{
  color: white;
  text-align: center;
  font-size: 50px;
  position: absolute;
  top: 8%;
  left: 40%;
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login-container{
  background-color: rgb(36, 66, 129);
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #ffff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .portrait{
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: 2px solid rgb(226, 226, 226);
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    img{
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: rgb(214, 214, 214);
    }
  }
}
</style>